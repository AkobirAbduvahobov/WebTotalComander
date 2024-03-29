﻿using Microsoft.AspNetCore.Http;
using WebTotalComander.Core.Errors;

namespace WebTotalComander.Repository.Services;

public class FileRepository : IFileRepository
{

    private static string uploadFolderPath = Directory.GetCurrentDirectory() + "\\DataBase\\";
    public async Task<bool> SaveFileAsync(Stream stream, string fileName, string path = "")
    {
        var filePath = Path.Combine(uploadFolderPath + path, fileName);

        string path1 = "";
        if (path != string.Empty)
        {
            path1 = path.Remove(path.Length - 1);
        }

        if (!Directory.Exists(uploadFolderPath + path1))
            throw new DirectoryNotFoundException("Directory was not found");

        if (File.Exists(filePath))
            throw new FileAlreadyExistException("File already exist");

        using (var newStream = new FileStream(filePath, FileMode.Create))
        {
            await stream.CopyToAsync(newStream);
        }

        return true;
    }

    public async Task<bool> DeleteFileAsync(string fileName, string path = "")
    {
        var filePath = Path.Combine(uploadFolderPath + path, fileName);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            return true;
        }
        else
        {
            throw new FileNotFoundException("File was not found");
        }
    }

    public async Task<MemoryStream> DownloadFileAsync(string filePath)
    {
        if (!File.Exists(uploadFolderPath + filePath))
        {
            throw new FileNotFoundException("File was not found to download");
        }

        var memoryStream = new MemoryStream();
        using (var stream = new FileStream(uploadFolderPath + filePath, FileMode.Open))
        {
            await stream.CopyToAsync(memoryStream);
        }
        memoryStream.Position = 0;
        return memoryStream;
    }

    public async Task<bool> ChangeFileAsync(IFormFile file, string filePath)
    {
        var path = uploadFolderPath + filePath;
        if (File.Exists(path))
        {
            File.Delete(path);
        }
        else
        {
            throw new FileNotFoundException( "No file to change" );
        }

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return true;

    }





}

