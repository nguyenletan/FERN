import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('test-results/homepage',{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.FERN_BROWSER_CHANNEL||'chrome'});
const page=await browser.newPage({viewport:{width:1536,height:1024}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(process.env.FERN_TEST_URL||'http://127.0.0.1:4173/');
 await page.getByPlaceholder('Enter demo').fill('demo');await page.getByPlaceholder('Enter your password').fill('demo');await page.getByRole('button',{name:'Sign in',exact:true}).click();
 await page.getByRole('heading',{name:'Welcome to FERN.',exact:true}).waitFor();
 await page.screenshot({path:'test-results/homepage/desktop.png'});
 await page.getByRole('button',{name:'Close menu',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Show navigation'}).getAttribute('aria-expanded'),'false');
 await page.getByRole('button',{name:'Show navigation'}).click();
 await page.getByRole('button',{name:'FM Overview',exact:true}).click();
 await page.getByRole('heading',{name:'FM Overview',exact:true}).waitFor();
 assert.equal(await page.getByRole('heading',{name:'Welcome to FERN.',exact:true}).count(),0);
 await page.getByText('No operational summary is available for this context.',{exact:false}).waitFor();
 await page.getByRole('button',{name:'Home',exact:true}).click();
 await page.getByRole('heading',{name:'Welcome to FERN.',exact:true}).waitFor();
 await page.getByRole('textbox',{name:'Find a tool, guide or learning topic'}).fill('pricing');await page.getByRole('button',{name:'Search FERN',exact:true}).click();await page.getByRole('heading',{name:'Suggested applications'}).waitFor();
 await page.getByRole('button',{name:'Get started',exact:true}).click();await page.getByRole('region',{name:'Getting started with FERN'}).waitFor();
 await page.getByRole('button',{name:'Choose your facility',exact:true}).click();await page.getByRole('region',{name:'Shared facility workspace'}).waitFor();
 await page.getByRole('button',{name:'Close guidance'}).click();
 for(const name of ['Pre-Contract & Tender Assessment','Lifecycle & Asset Analysis','Contract & Service Model','Pricing Template Generator','Mobilisation & Transition Tracker']){
  await page.getByRole('region',{name:'Your applications',exact:true}).getByRole('button',{name:'Open '+name,exact:true}).click();
  await page.getByRole('heading',{level:1}).first().waitFor();
  await page.getByRole('button',{name:'Home',exact:true}).click();
  await page.getByRole('heading',{name:'Welcome to FERN.',exact:true}).waitFor();
 }
 await page.evaluate(()=>document.querySelector('main').scrollTop=99999);await page.screenshot({path:'test-results/homepage/desktop-bottom.png'});
 await page.setViewportSize({width:390,height:844});await page.reload();await page.getByPlaceholder('Enter demo').fill('demo');await page.getByPlaceholder('Enter your password').fill('demo');await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.getByRole('heading',{name:'Welcome to FERN.',exact:true}).waitFor();
 assert.equal(await page.getByRole('button',{name:'Show navigation'}).getAttribute('aria-expanded'),'false');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'No mobile page overflow');
 await page.screenshot({path:'test-results/homepage/mobile.png'});
 await page.getByRole('button',{name:'Show navigation'}).click();await page.getByRole('button',{name:'Close menu',exact:true}).waitFor();await page.screenshot({path:'test-results/homepage/mobile-menu.png'});
 await page.getByRole('button',{name:'Close menu',exact:true}).click();await page.evaluate(()=>document.querySelector('main').scrollTop=99999);await page.screenshot({path:'test-results/homepage/mobile-bottom.png'});
 assert.deepEqual(errors,[]);fs.writeFileSync('test-results/homepage/result.json',JSON.stringify({passed:true,desktop:[1536,1024],mobile:[390,844],errors,checks:['menu','search','guidance','facility history','five app destinations','mobile overflow','mobile menu']},null,2));
}finally{await browser.close();}
