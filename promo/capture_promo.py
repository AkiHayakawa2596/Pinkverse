#!/usr/bin/env python3
import argparse, json, os, shutil, subprocess, time, hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'promo' / 'build'
RAW = OUT / 'raw'
WORK = OUT / 'capture_app'
SEED = {
  'plays': 14, 'hearts': 312, 'sound': False, 'onboardingSeen': True,
  'lastGame': 'pink-tiles',
  'best': {'polaroid-pair':82,'camera-call':74,'lightstick-wave':91,'pink-tiles':88,'beat-switch':67,'pink-cipher':72,'stage-route':65,'fanlight-grid':58,'concert-freeplay':86},
  'gamePlays': {'polaroid-pair':3,'pink-tiles':5,'concert-freeplay':3},
  'recent': [
    {'id':'pink-tiles','score':88,'grade':'A','at':1760000000000},
    {'id':'lightstick-wave','score':91,'grade':'S','at':1759996400000},
    {'id':'polaroid-pair','score':82,'grade':'B','at':1759992800000}
  ],
  'pixelOutfits': {'Jisoo':'pink','Jennie':'pink','Rosé':'pink','Lisa':'pink'}
}

SHOTS = [
  ('01_home_hero', 3.0), ('02_fanpass', 2.0), ('03_concert_scroll', 2.0),
  ('04_concert_feature', 3.0), ('05_concert_start', 2.0), ('06_builder', 4.0),
  ('07_live_stage', 6.0), ('08_game_deck', 4.0), ('09a_tiles', 0.9),
  ('09b_polaroid', 0.9), ('09c_switch', 0.9), ('10_result', 1.4)
]

def copy_capture_app():
    if WORK.exists(): shutil.rmtree(WORK)
    shutil.copytree(ROOT, WORK, ignore=shutil.ignore_patterns('promo', '.git', '.firebase'))
    app = WORK / 'app.js'
    txt = app.read_text(encoding='utf-8')
    needle = "  if('serviceWorker' in navigator){"
    helper = "  window.PV.__promoFinish=(id,score,detail='PROMO CAPTURE')=>finish(id,score,detail);\n"
    if helper not in txt and needle in txt:
        txt = txt.replace(needle, helper + needle)
        app.write_text(txt, encoding='utf-8')

def seed_script():
    return "localStorage.setItem('pinkverse-v1.0.0', JSON.stringify(%s));" % json.dumps(SEED, ensure_ascii=False)

def wait_ready(page):
    page.wait_for_load_state('domcontentloaded')
    try: page.wait_for_function("document.fonts ? document.fonts.status === 'loaded' : true", timeout=15000)
    except: pass
    page.wait_for_timeout(800)

def setup_home(page):
    page.goto('http://127.0.0.1:8000/#')
    wait_ready(page)
    try: page.evaluate("window.PV.dismissOnboarding?.()")
    except: pass
    page.evaluate("window.scrollTo(0,0)")

def setup_shot(page, name):
    setup_home(page)
    if name == '01_home_hero':
        return
    if name == '02_fanpass':
        page.locator('#fanpass').scroll_into_view_if_needed(); page.wait_for_timeout(350); return
    if name == '03_concert_scroll':
        page.evaluate("window.scrollTo(0,0)"); return
    if name == '04_concert_feature':
        page.locator('#concert').scroll_into_view_if_needed(); page.wait_for_timeout(400); return
    if name == '05_concert_start':
        page.evaluate("window.PV.open('concert-freeplay')"); page.wait_for_timeout(500); return
    if name == '06_builder':
        page.evaluate("window.PV.start('concert-freeplay','medium')"); page.wait_for_timeout(500)
        page.evaluate("window.PV.concertPreset('power'); window.PV.concertMode('live');")
        page.wait_for_timeout(300); return
    if name == '07_live_stage':
        page.evaluate("window.PV.start('concert-freeplay','medium')"); page.wait_for_timeout(400)
        page.evaluate("window.PV.concertPreset('power'); window.PV.concertMode('live'); window.PV.concertOutfit('Jennie','noir'); window.PV.concertStartShow();")
        page.wait_for_timeout(1000); return
    if name == '08_game_deck':
        page.locator('#library').scroll_into_view_if_needed(); page.wait_for_timeout(300); return
    if name == '09a_tiles':
        page.evaluate("window.PV.start('pink-tiles','medium')"); page.wait_for_timeout(600); return
    if name == '09b_polaroid':
        page.evaluate("window.PV.start('polaroid-pair','medium')"); page.wait_for_timeout(600); return
    if name == '09c_switch':
        page.evaluate("window.PV.start('beat-switch','medium')"); page.wait_for_timeout(600); return
    if name == '10_result':
        page.evaluate("window.PV.__promoFinish('pink-tiles',96,'PROMO CAPTURE · 42 combo · 31 perfect · 1 miss')"); page.wait_for_timeout(500); return

def run_action(page, name, duration):
    t0=time.monotonic()
    def remain(): return max(0, duration - (time.monotonic()-t0))
    if name == '03_concert_scroll':
        page.get_by_role('button', name='OPEN CONCERT MODE ↓').click(); page.wait_for_timeout(int(duration*1000))
    elif name == '04_concert_feature':
        page.wait_for_timeout(int(duration*1000))
    elif name == '05_concert_start':
        page.get_by_role('button', name='Full Set').click() if page.get_by_role('button', name='Full Set').count() else None
        page.wait_for_timeout(int(duration*1000))
    elif name == '06_builder':
        page.wait_for_timeout(900)
        page.evaluate("window.PV.concertOutfit('Jennie','noir')")
        page.wait_for_timeout(900)
        page.locator('.concert-start-show').scroll_into_view_if_needed()
        page.wait_for_timeout(max(0, int(remain()*1000)))
    elif name == '07_live_stage':
        try:
            page.locator('#concertPlayBtn').wait_for(timeout=3000)
            txt=page.locator('#concertPlayBtn').inner_text().strip().upper()
            if 'PLAY' in txt and not page.locator('#concertPlayBtn').is_disabled(): page.locator('#concertPlayBtn').click()
        except: pass
        page.wait_for_timeout(1200)
        for cue in ['pyro','confetti','wave']:
            try: page.evaluate(f"window.PV.concertCue('{cue}')")
            except: pass
            page.wait_for_timeout(650)
        try:
            if page.locator('.live-call-actions button').count(): page.locator('.live-call-actions button').first.click()
        except: pass
        page.wait_for_timeout(max(0, int(remain()*1000)))
    elif name == '08_game_deck':
        for cat in ['live','photo','all']:
            page.evaluate(f"window.PV.filterDeck('{cat}')")
            page.wait_for_timeout(850)
        page.wait_for_timeout(max(0,int(remain()*1000)))
    elif name == '09b_polaroid':
        if page.locator('.memory-tile').count():
            page.locator('.memory-tile').nth(0).click(); page.wait_for_timeout(350)
            if page.locator('.memory-tile').count()>1: page.locator('.memory-tile').nth(1).click()
        page.wait_for_timeout(max(0,int(remain()*1000)))
    elif name == '09c_switch':
        btn=page.locator('.switch-pad button').first
        if btn.count(): btn.click()
        page.wait_for_timeout(max(0,int(remain()*1000)))
    else:
        page.wait_for_timeout(int(duration*1000))

def capture(browser, name, duration, base_url):
    temp = RAW / f'_tmp_{name}'
    if temp.exists(): shutil.rmtree(temp)
    temp.mkdir(parents=True)
    ctx=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=3,is_mobile=True,has_touch=True,
                            record_video_dir=str(temp),record_video_size={'width':1170,'height':2532})
    ctx.add_init_script(seed_script())
    page=ctx.new_page()
    page.goto(base_url, wait_until='domcontentloaded', timeout=30000)
    wait_ready(page)
    setup_shot(page,name)
    page.wait_for_timeout(250)
    run_action(page,name,duration)
    video=page.video
    ctx.close()
    src=Path(video.path())
    dst=RAW/f'{name}.webm'
    shutil.move(str(src),dst)
    shutil.rmtree(temp,ignore_errors=True)
    return dst

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--browser', default=None, help='Optional Chromium executable path; omit to use Playwright Chromium'); ap.add_argument('--keep-work',action='store_true')
    args=ap.parse_args()
    OUT.mkdir(parents=True,exist_ok=True); RAW.mkdir(parents=True,exist_ok=True)
    copy_capture_app()
    server=subprocess.Popen(['python','-m','http.server','8000','--bind','127.0.0.1'],cwd=WORK,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    log=[]
    try:
        time.sleep(1)
        with sync_playwright() as p:
            browser_path = args.browser if args.browser and Path(args.browser).exists() else None
            browser=p.chromium.launch(executable_path=browser_path,headless=True,args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
            for i,(name,dur) in enumerate(SHOTS,1):
                print(f'[{i}/{len(SHOTS)}] capture {name}')
                path=capture(browser,name,dur,'http://127.0.0.1:8000/')
                log.append({'shot':name,'target_seconds':dur,'route':'scripted','viewport':'390x844','dpr':3,'seed_hearts':312,'file':str(path.relative_to(ROOT))})
            browser.close()
    finally:
        server.terminate()
        try: server.wait(timeout=5)
        except: server.kill()
        if not args.keep_work: shutil.rmtree(WORK,ignore_errors=True)
    (OUT/'shot_log.json').write_text(json.dumps(log,indent=2),encoding='utf-8')
    print('Raw captures complete. Run: python promo/render_promo.py')
if __name__=='__main__': main()
