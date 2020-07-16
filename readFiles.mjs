import fs from 'fs';

export default class ReadFiles
{
  constructor()
  {
    this.data();
    this.read();
  }

  data()
  {
    this.path   = './images';
    this.files  = [];
    this.paths  = [];
  }

  read()
  {
    fs.readdirSync(this.path).forEach(file => {
      this.files.push(file);
    });
  }

  createPaths()
  {
    this.files.forEach(file => {
      this.paths.push(`./images/${file}`);
    });
  }

}
