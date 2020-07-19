import fs from 'fs';
import unzipper from 'unzipper';

export default class Clean
{
  constructor()
  {
    this.data();
    this.moveFile();
  }

  data()
  {
    this.file       = './icomoon.zip';
    this.path       = 'C:/Users/bawoma/Downloads/icomoon.zip';
    this.output     = './icomoon';
  }

  async moveFile()
  {
    fs.rename(this.path, this.file, (err) => {       
      if (err) throw new Error(err) 
      this.unzip();
    })
  }

  unzip()
  {
    fs.createReadStream(this.file)
      .pipe(unzipper.Extract({ path: this.output }))

  }

}

new Clean();
