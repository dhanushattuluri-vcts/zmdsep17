// Browser regression checks for the desktop homepage. Requires Playwright (or
// PLAYWRIGHT_MODULE pointing to an existing installation) and a running preview.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const out=process.env.ARTIFACT_DIR || '/tmp/zmd-home-verification';
const baseUrl=process.env.BASE_URL || 'http://127.0.0.1:4173';
fs.mkdirSync(out,{recursive:true});
const sequence=require('../src/pages/homeSequence.json');
const chapters=Object.entries(sequence.chapters);
const lastFrame=sequence.frameCount-1;
const closingButton=`Go to chapter ${chapters.length+1}:`;
const checks=[];
function passed(name,data={}) {checks.push({name,...data});console.log('PASS',name,JSON.stringify(data));}
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1366,height:768}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&r.url().includes('frame_'))errors.push(`Frame request failed: ${r.status()} ${r.url()}`);});
 await page.goto(baseUrl,{waitUntil:'domcontentloaded'});await page.waitForSelector('.home-scene-media canvas[style*="opacity: 1"]');
 const state=()=>page.locator('#home-story').evaluate(e=>({frame:+e.dataset.displayedFrame,target:+e.dataset.targetFrame,moving:e.dataset.moving==='true',cache:+e.dataset.decodedFrames,y:scrollY,end:e.offsetHeight-innerHeight,chapter:document.querySelector('.home-story-current strong').textContent}));
 const settle=async frame=>{await page.waitForFunction(f=>{const e=document.querySelector('#home-story');return +e.dataset.displayedFrame===f&&e.dataset.moving==='false'},frame,{timeout:15000});};
 const wheel=(deltaY,opts={})=>page.evaluate(({deltaY,opts})=>{const event=new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY,...opts});document.querySelector('.home-desktop-stage').dispatchEvent(event);return event.defaultPrevented},{deltaY,opts});
 const seek=async frame=>{await page.evaluate(({frame,lastFrame})=>{const s=document.querySelector('#home-story');scrollTo({top:frame/lastFrame*(s.offsetHeight-innerHeight),behavior:'instant'})},{frame,lastFrame});await settle(frame);};
 const home=async()=>{await page.getByRole('button',{name:'Go to chapter 1:',exact:false}).click();await settle(0);await page.mouse.move(900,600);};
 await home(); await page.mouse.wheel(0,120);assert.equal((await state()).target,64);await settle(64);passed('Isolated real wheel advances exactly 64 frames',await state());
 await page.mouse.wheel(0,120);await settle(128);await page.mouse.wheel(0,120);await settle(192);passed('Three ordinary gestures advance 192 frames',await state());
 await home(); await wheel(120);await page.waitForTimeout(65);await wheel(120);await page.waitForTimeout(65);await wheel(120);assert.equal((await state()).target,192);await settle(192);passed('Rapid mouse notches accumulate against the target');
 await home();await page.evaluate(async()=>{for(const deltaY of [2,4,8,18,35,62,86,72,58,45,34,26,20,15,11,8,6,4,3,2,1]){document.querySelector('.home-desktop-stage').dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY}));await new Promise(r=>setTimeout(r,22));}});await settle(64);passed('Trackpad burst and decaying momentum produce one advance');
 await home();await wheel(120);await page.waitForTimeout(65);await wheel(120);await page.waitForTimeout(80);const before=await state();await wheel(-120);const reversed=await state();assert.ok(Math.abs(reversed.target-Math.max(0,before.frame-64))<=5);assert.ok(reversed.target<before.target);await settle(reversed.target);passed('Reversal cancels the pending forward destination',{before,after:reversed});
 await home();const homeHeader=page.locator('.desktop-header.home-glass');assert.equal(await homeHeader.count(),1);assert.equal(await homeHeader.evaluate(e=>getComputedStyle(e).position),'fixed');assert.equal(await homeHeader.locator('.header-nav .nav-link').count(),4);assert.equal(await homeHeader.locator('.btn-red-contact').count(),1);await page.getByRole('button',{name:'Products'}).hover();await page.waitForSelector('.mega-menu-overlay');assert.equal(await page.locator('.mega-menu-overlay .mega-col').count(),6);await page.mouse.move(20,740);await page.waitForFunction(()=>!document.querySelector('.mega-menu-overlay'));passed('Homepage uses the shared glass navigation and product mega menu');
 await home();assert.equal(await wheel(120,{ctrlKey:true}),false);assert.equal(await wheel(10,{deltaX:120}),false);assert.equal((await state()).target,0);passed('Zoom and horizontal gestures are not intercepted');
 await page.evaluate(()=>document.activeElement.blur());await page.keyboard.press('ArrowDown');await settle(64);await page.keyboard.press('PageDown');await settle(128);passed('Keyboard advances and settles');
 await wheel(120);await page.waitForTimeout(90);await seek(430);await page.waitForTimeout(600);assert.equal((await state()).frame,430);passed('External document scroll cancels animation without fighting scrollbar input');
 if(sequence.appendedClip){
  const join=sequence.appendedClip.startFrame;
  await home();await seek(join-10);await wheel(120);await settle(join+54);
  await wheel(-120);await settle(join-10);
  passed('A 64-frame gesture crosses the appended clip join in both directions');
 }
 await seek(lastFrame-31);await page.mouse.move(900,600);await page.mouse.wheel(0,120);await settle(lastFrame);assert.ok(Math.abs((await state()).y-(await state()).end)<=1);await page.waitForTimeout(200);assert.equal((await state()).y,(await state()).end);passed('Final story gesture lands on final frame without entering closing');
 await page.mouse.wheel(0,200);await page.waitForTimeout(300);assert.ok((await state()).y>(await state()).end);await page.mouse.wheel(0,-400);await page.waitForTimeout(450);assert.ok((await state()).frame<lastFrame);passed('Subsequent native scroll enters closing and reverse scroll re-enters story');
 await home();await seek(lastFrame-31);await page.evaluate(async()=>{for(const deltaY of [10,20,45,65,80,65,50,38,29,22,16,12,9,6,4,3,2,1]){document.querySelector('.home-desktop-stage').dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY}));await new Promise(r=>setTimeout(r,45));}});await settle(lastFrame);assert.ok(Math.abs((await state()).y-(await state()).end)<=1);passed('Trackpad momentum after settling cannot spill into closing');
 await page.getByRole('button',{name:closingButton,exact:false}).click();await page.waitForTimeout(320);await home();passed('Chapter selection after closing survives a delayed native scroll event');
 // Inspect the new combined clip's endpoints and
 // both sides of chapter switches at all three requested desktop dimensions.
 const clipBoundaries=sequence.clipBoundaries || [];
 const frames=[...new Set([0,...[...chapters.slice(1).map(([,c])=>c.start),...clipBoundaries].flatMap(f=>[f-1,f,f+1]),lastFrame])].sort((a,b)=>a-b);
 for(const [width,height] of [[1366,768],[1440,900],[1920,1080]]){
  await page.setViewportSize({width,height});await home();await page.waitForTimeout(200);
  assert.notEqual(await page.locator('.desktop-header').evaluate(e=>getComputedStyle(e).display),'none');assert.equal(await page.locator('.desktop-header').evaluate(e=>e.classList.contains('home-glass')),true);assert.equal(await page.locator('.home-desktop-stage').evaluate(e=>e.getBoundingClientRect().top),0);
  assert.equal(await page.locator('.home-navigation').count(),0);assert.equal(await page.locator('.desktop-header .header-nav .nav-link').count(),4);assert.equal(await page.locator('.hmpg-story-shade').count(),0);
  for(const f of frames){await seek(f);await page.waitForTimeout(320);const st=await state();assert.ok(st.cache<=16);await page.screenshot({path:`${out}/${width}-frame-${f}.png`});}
  for(const [i,[label,{checkpoint:f}]] of chapters.entries()){await page.getByRole('button',{name:`Go to chapter ${i+1}:`,exact:false}).click();await settle(f);assert.equal((await state()).chapter,label);await page.waitForTimeout(320);await page.screenshot({path:`${out}/${width}-chapter-${i}.png`});
   const layout=await page.locator('.home-scene-copy.is-active').evaluate(e=>{const b=e.getBoundingClientRect();const n=document.querySelector('.desktop-header').getBoundingClientRect();return{top:b.top,bottom:b.bottom,right:b.right,width:innerWidth,navBottom:n.bottom}});assert.ok(layout.top>layout.navBottom);assert.ok(layout.right<width);assert.ok(layout.bottom<height-64);
  }
  const positions=[];
  for(const [index,[label,timing]] of chapters.entries()) {
   if(index===0) continue;
   await seek(timing.checkpoint);
   const copy=page.locator('.home-scene-copy.is-active');
   assert.equal(await copy.getByRole('heading',{name:label.toUpperCase(),exact:true}).count(),1);
   assert.equal(await copy.evaluate(e=>+getComputedStyle(e).opacity),1);
   positions.push(await copy.evaluate(e=>e.getBoundingClientRect().top));
   await seek(timing.reveal[0]);
   assert.equal(await page.locator(`[data-scene-copy="${index}"]`).evaluate(e=>+getComputedStyle(e).opacity),0);
   await seek(timing.checkpoint);
   assert.equal(await page.locator(`[data-scene-copy="${index}"]`).evaluate(e=>+getComputedStyle(e).opacity),1);
  }
  assert.ok(Math.max(...positions)-Math.min(...positions)>height*.35);
  passed(`Product chapters and finale have independent compositions and reversible frame-driven reveals at ${width}`);
  const sense=sequence.chapters.Sense;
  await seek(Math.round((sense.reveal[0]+sense.reveal[1])/2));
  const captionOpacity=await page.locator('.home-scene-sense .home-scene-caption > *').evaluateAll(nodes=>nodes.map(e=>+getComputedStyle(e).opacity));
  assert.ok(captionOpacity[0]>captionOpacity[1]&&captionOpacity[1]>captionOpacity[2]);
  passed(`Caption details reveal in sequence at ${width}`);
  await page.getByRole('button',{name:closingButton,exact:false}).click();await page.waitForTimeout(350);await page.screenshot({path:`${out}/${width}-closing.png`});
  const closing=await page.locator('.hmpg-closing-actions').evaluate(e=>e.getBoundingClientRect().toJSON());assert.ok(closing.bottom<=height);assert.ok(closing.top>=0);assert.equal(await page.locator('.desktop-header').evaluate(e=>e.classList.contains('home-glass')),false);assert.equal(await page.locator('.desktop-header').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');assert.equal(await page.locator('.desktop-header').evaluate(e=>getComputedStyle(e).position),'fixed');
  passed(`Visual states, chapter controls, complete closing and 16-frame memory cap at ${width} × ${height}`,{sampledFrames:frames.length});
 }
 await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await page.waitForTimeout(300);assert.ok(await page.locator('footer').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight+1));passed('Original footer remains reachable in document flow');
 await page.goto(`${baseUrl}/products/cam`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);assert.notEqual(await page.locator('.desktop-header').evaluate(e=>getComputedStyle(e).display),'none');assert.equal(await page.locator('.desktop-header').evaluate(e=>e.classList.contains('home-glass')),false);assert.equal(await page.locator('.home-navigation').count(),0);passed('Other routes retain their white desktop navigation');
 await page.setViewportSize({width:390,height:844});await page.goto(baseUrl,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);assert.equal(await page.locator('.hmpg-story-shell').count(),1);assert.equal(await page.locator('.home-desktop-story').count(),0);await page.screenshot({path:`${out}/mobile.png`});passed('Original small-screen story remains mounted');
 for(const index of [chapters.length-1,2,0]){
  await page.getByRole('button',{name:`Go to chapter ${index+1}:`,exact:false}).click();
  await page.waitForFunction(f=>Math.abs(+document.querySelector('#home-story').dataset.currentFrame-f)<=1,chapters[index][1].checkpoint);
  assert.equal(await page.locator('.hmpg-chapter-selector button[aria-current]').textContent(),`${String(index+1).padStart(2,'0')}${chapters[index][0]}`);
 }
 passed('Mobile chapter controls seek forwards and backwards through the replacement frames');
 await page.setViewportSize({width:1366,height:768});await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(350);assert.equal(await page.locator('.home-static-story .home-scene-copy').count(),chapters.length);assert.equal(await page.locator('.home-desktop-story canvas').count(),0);assert.equal(await page.locator('h1').count(),1);await page.screenshot({path:`${out}/reduced-motion.png`});passed('Reduced-motion fallback exposes all product chapters and navigation');
 assert.deepEqual(errors,[]);passed('No browser JavaScript errors');
 fs.writeFileSync(`${out}/checks.json`,JSON.stringify(checks,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
