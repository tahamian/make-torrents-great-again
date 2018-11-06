const config = require('./../res/config.json');

interface ITorrentDataType {
  name:                     String;
  defaultSaveDirectory:     String;
}

class TorrentDataType implements ITorrentDataType {
  public name:                  String;
  public defaultSaveDirectory:  String;
}