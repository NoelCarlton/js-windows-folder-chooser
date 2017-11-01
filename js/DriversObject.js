var DriversObject = function(){
    var fileSystemObject = new ActiveXObject("Scripting.FileSystemObject");

    /**
     *获取磁盘盘符
     * @returns {string}  C:,D:,E:,
     */
    var getDriver = function(){
        var enumerator = new Enumerator(fileSystemObject.Drives);
        var driverInfo = "";
        var temp;
        for(;!enumerator.atEnd();enumerator.moveNext()){
            temp = enumerator.item();
            driverInfo += temp.DriveLetter;
            driverInfo += ":,";
        }
        return driverInfo;
    }

    /**
     * 获取带有磁盘名称的盘符
     * @returns {string} C:\Windows,D:\Noel,E:\RECOVERY,
     */
    var getDriverWithName = function(){
        var enumerator = new Enumerator(fileSystemObject.Drives);
        var driverInfo = "";
        var temp;
        for(;!enumerator.atEnd();enumerator.moveNext()){
            temp = enumerator.item();
            driverInfo += temp.DriveLetter;
            driverInfo += ":\\";
             var name = "";
             if(temp.DriveType == 3){
             name = temp.ShareName;
             }else if(temp.IsReady){
             name = temp.VolumeName;
             }else{
             name = "[驱动未就绪]";
             }
             name += ",";
             driverInfo += name;
        }
        return driverInfo;
    }

    /**
     * 获取文件夹
     * @param path D:\profiles | D:\profiles\
     * @returns {*} D:\profiles\
     */
    var getFolder = function(path){
        if(path.charAt(path.length-1) == "\\"){
            return path;
        }else{
            return path += "\\";
        }
    }

    /**
     * 获取子文件夹
     * @param path D:\profiles
     * @returns {string}  D:\profiles\AmusementPark,D:\profiles\angular,D:\profiles\jars,D:\profiles\java,
     */
    var enterFolder = function(path){
        path = getFolder(path);
        var folder = fileSystemObject.GetFolder(path);
        var subFolder = new Enumerator(folder.SubFolders);
        var folderInfo = "";
        for(;!subFolder.atEnd();subFolder.moveNext()){
            folderInfo += subFolder.item();
            folderInfo += ",";
        }
        return folderInfo;
    }

    /**
     * 在选中的文件夹中创建文件夹
     * @param parentPath 要创建文件夹的目标文件夹
     * @param name 新建的文件夹名称
     * @returns {string} 文件夹路劲
     */
    var createFolder = function(parentPath,name){
        if(parentPath.IsRootFolder){
            alert("不能在更目錄創建文件夾");
            return;
        }
        parentPath = getFolder(parentPath);
        fileSystemObject.CreateFolder(parentPath+name);
        return parentPath;
    }

    /**
     * 获取文件夹名
     * @param path 文件夹的完整目录D:\Setups
     * @returns {*} 文件夹名字 Setups
     */
    var getBaseName = function (path) {
        return fileSystemObject.getBaseName(path);
    }

    this.getDriver = getDriver;
    this.getFolder = getFolder;
    this.getDriverWithName = getDriverWithName;
    this.enterFolder = enterFolder;
    this.createFolder = createFolder;
    this.getBaseName = getBaseName;
}
