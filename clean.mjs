import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

export default class Clean
{
  constructor()
  {
    this.data();
    this.makeDir();
    this.checkIfExist();
  }

  data()
  {
    this.path       = './icomoon.zip';
    this.output     = './icomoon';
    this.dir        = '/fonts';
    this.selection  = `${this.output}/selection.json`;
    this.style      = `${this.output}/style.css`;
    this.extensions = ['svg', 'eot', 'ttf', 'woff'];
    this.fontsName  = 'fs-fonts';
  }

  makeDir()
  {
    fs.mkdir('C:/Users/bawoma/Projects/icomoon/fonts', (err) => { 
      if (err) { 
          return console.error(err); 
      } 
    }); 
  }

  checkIfExist()
  {
    try {
      if (fs.existsSync(this.output)) {
        this.moveFiles();
      }
    } catch(err) {
      console.log(`This path: ${this.output}, doesn't exist`);
    }
  }

  moveFiles()
  {
    this.extensions.forEach(extension => {
      fs.rename(`${this.output}/fonts/icomoon.${extension}`, `./${this.dir}/${this.fontsName}.${extension}`, (err) => {
        if (err) throw err
      })
    })

    fs.rename(this.selection, `./${this.dir}/selection.json`, (err) => {
      if (err) throw err
    })

    fs.rename(this.style, `./${this.dir}/style.css`, (err) => {
      if (err) throw err
    })

    this.findReplace();
    this.removeFiles();
  }

  findReplace()
  {
    fs.readFile(`./${this.dir}/style.css`, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      this.result = data.replace(/icomoon/g, this.fontsName);
    
      fs.writeFile(`./${this.dir}/style.css`, this.result, 'utf8', err => {
         if (err) return console.log(err);
      });
    });
  }

  removeFiles()
  {
    rimraf(this.path, () =>  console.log("ZIP was removed"));
    rimraf(this.output, () =>  console.log("Fonts was removed"));
  }

}

new Clean();
