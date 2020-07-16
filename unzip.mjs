import fs from 'fs';
import unzipper from 'unzipper';

export default class Clean
{
  constructor()
  {
    this.data();
    this.moveFile();
    setTimeout(() => this.unzip(), 3000);
  }

  data()
  {
    this.file       = './icomoon.zip';
    this.path       = 'C:/Users/bawoma/Downloads/icomoon.zip';
    this.output     = './icomoon';
  }

  moveFile()
  {
    fs.rename(this.path, this.file, (err) => {
      if (err) throw err
    })
  }

  unzip()
  {
    fs.createReadStream(this.file)
      .pipe(unzipper.Extract({ path: this.output }))
  }

}

new Clean();
