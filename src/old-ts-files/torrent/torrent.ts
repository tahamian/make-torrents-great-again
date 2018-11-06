class Torrent {
  private timeAdded   : Date;
  private name        : String;
  private description : String;
  private dataType    : TorrentDataType;

  public Torrent() {
    this.timeAdded = new Date();
  }
}