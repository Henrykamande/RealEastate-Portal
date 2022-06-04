export function onFilePicked (event) {
    const file = event.target.files[0] || null
    if (!file) { return }
    const imageName = file.name
  
    if (imageName.lastIndexOf('.') <= 0) {
      return
    }
    
    this.rawImage = event.target.files[0]
    this.imageCollection = event.target.files
    this.fileName = file.name
  
    const fileReader = new FileReader()
  
    fileReader.readAsDataURL(file)
  
    fileReader.addEventListener('load', () => {
      this.imageUrl = fileReader.result
      if (typeof (this.standAlone) !== 'undefined') {
        this.emitData()
      }
    })
    this.image = file
  }
  
  export function fileUploadInit () {
    this.$refs.fileInput.click()
  }
  
  export function trimText(string){
    var length = 30;
    var trimmedString = string.substring(0, length);
    return trimmedString;
  }
  
  export function trimJobText(string){
    var length = 200;
    var trimmedString = string.substring(0, length);
    return trimmedString;
  }
  
  
  export function trimProjectText(string){
    var length = 25;
    var trimmedString = string.substring(0, length);
    return trimmedString;
  }