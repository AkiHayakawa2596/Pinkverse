#!/usr/bin/env python3
import subprocess, shutil, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BUILD=ROOT/'promo'/'build'; RAW=BUILD/'raw'; CUT=BUILD/'cuts'
CUT.mkdir(parents=True,exist_ok=True)
FF='ffmpeg'
# Target storyboard totals exactly 30.0 s after trimming/retiming.
TIMELINE=[
 ('01_home_hero',3.0,'PLAY PINK. LIVE.','ARCADE + CONCERT'),
 ('02_fanpass',2.0,'',''),('03_concert_scroll',2.0,'',''),
 ('04_concert_feature',3.0,'DIRECT YOUR PIXEL CONCERT','BUILD · DIRECT · ENCORE'),
 ('05_concert_start',2.0,'',''),('06_builder',4.0,'BUILD THE SETLIST','3–5 SONGS'),
 ('07_live_stage',6.0,'CALL THE SHOW','LIVE DIRECTOR'),
 ('08_game_deck',4.0,'12 MODES','PICK A LANE'),
 ('09a_tiles',0.67,'',''),('09b_polaroid',0.66,'',''),('09c_switch',0.67,'',''),
 ('10_result',1.0,'MASTER THE DECK','★ AT 50 / 70 / 90')]
# 29.0 sec above + 1.0 sec end card = 30.0 sec.

def run(cmd): print(' '.join(map(str,cmd))); subprocess.run(list(map(str,cmd)),check=True)

def esc(s): return s.replace('\\','\\\\').replace(':','\\:').replace("'","\\'")

def make_cut(name,dur,cap,sub):
    src=RAW/f'{name}.webm'; out=CUT/f'{name}.mp4'
    if not src.exists(): raise SystemExit(f'Missing {src}; run capture_promo.py first')
    vf=["scale=795:1720:force_original_aspect_ratio=decrease","pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=#0b090b"]
    if cap:
        vf.append(f"drawtext=text='{esc(cap)}':font='DejaVu Sans':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=45")
    if sub:
        vf.append(f"drawtext=text='{esc(sub)}':font='DejaVu Sans Mono':fontcolor=#ff9bc9:fontsize=22:x=(w-text_w)/2:y=105")
    run([FF,'-y','-sseof',f'-{dur}','-i',src,'-t',dur,'-vf',','.join(vf),'-an','-r','60','-c:v','libx264','-crf','15','-pix_fmt','yuv420p',out])
    return out

def make_endcard():
    png=ROOT/'assets/icons/icon-512.png'; out=CUT/'11_endcard.mp4'
    vf=("drawtext=text='PINKVERSE':font='DejaVu Sans':fontcolor=white:fontsize=82:x=(w-text_w)/2:y=1110,"+
        "drawtext=text='FAN ARCADE · UNOFFICIAL FAN PROJECT':font='DejaVu Sans Mono':fontcolor=#ff9bc9:fontsize=25:x=(w-text_w)/2:y=1220")
    run([FF,'-y','-f','lavfi','-i','color=c=#0b090b:s=1080x1920:r=60:d=1','-loop','1','-i',png,'-filter_complex',f"[0:v][1:v]overlay=(W-w)/2:720:shortest=1,{vf}",'-t','1','-an','-c:v','libx264','-crf','15','-pix_fmt','yuv420p',out])
    return out

def concat(files,out):
    lst=CUT/'concat.txt'; lst.write_text(''.join(f"file '{p.as_posix()}'\n" for p in files),encoding='utf-8')
    run([FF,'-y','-f','concat','-safe','0','-i',lst,'-c','copy',out])

def cutdown(master,seconds,out):
    run([FF,'-y','-i',master,'-t',seconds,'-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-an',out])

def main():
    cuts=[make_cut(*row) for row in TIMELINE]
    cuts.append(make_endcard())
    master=BUILD/'pinkverse_promo_30s_9x16.mp4'; concat(cuts,master)
    cutdown(master,15,BUILD/'pinkverse_promo_15s_9x16.mp4')
    cutdown(master,6,BUILD/'pinkverse_promo_6s_9x16.mp4')
    print(master)
if __name__=='__main__': main()
