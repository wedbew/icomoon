import puppeteer from 'puppeteer';
import readFiles from './readFiles.mjs';

export default class CreateFonts
{
  constructor()
  {
    this.data();
    this.uploadImages();
  }

  data()
  {
    this.link    = 'https://icomoon.io/app/#/select';
    this.icon    = '.icon-menu';
    this.selctor = 'button[mi-popup="focus"]';
    this.files   = new readFiles().files;
    this.paths   = new readFiles().paths;
    this.x       = 826;
    this.y       = 272;
  }

  async uploadImages()
  {
    console.log(`Number of images: ${this.files.length}`);
    this.browser = await puppeteer.launch({
      'headless': false,
      // args: ['--start-fullscreen'],
    });
    this.page    = await this.browser.newPage();

    // await this.page.setViewport({ width: 1920, height: 1080 });
    
    await this.page.goto(this.link, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });

    try {
      await this.page.waitForSelector(this.icon , {visible: true});
      const [fileChooser] = await Promise.all([
        this.page.waitForFileChooser(),
        this.page.click('.file'),
      ]);
      await fileChooser.accept([...this.paths]);
      await this.page.waitForSelector('.icon' , {visible: true});
      
      // this.files.forEach(async (item, index) => {
      //   await this.page.waitFor(100);
      //   await this.page.waitForSelector(`[data-idx="${index}"]` , {visible: true});
      //   try {
      //     await this.page.click(`[data-idx="${index}"]`);
      //   } catch(err) {
      //     console.log(err);
      //   }
      // })
      await this.page.waitForSelector('button.btn5' , {visible: true});
      // await this.page.click('button.btn5');
      await this.page.waitFor(1000);
      await this.page.mouse.click(747, 140, { button: 'left' });
      await this.page.waitFor(100);
      await this.page.mouse.click(this.x, this.y, { button: 'left' });
      // await this.page.click('a[href="#/select/font"]');
      // await this.page.waitForSelector('.btn4' , {visible: true});
      // await this.page.click('.btn4');
      // await this.page.waitFor(3000);
    
    } catch(err) {
      console.log(err);
      // await this.browser.close();
    }
    // await this.browser.close();
  }
}

new CreateFonts();

