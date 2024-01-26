﻿using Microsoft.AspNetCore.Http;

namespace WebTotalComander.Repository.Services;

public interface IFolderRepository
{
    public Task<bool> CreateFolderAsync(string folderName, string folderPath = "");
    public Task<bool> DeleteFolderAsync(string folderPath);
    public Task<string[]> GetAllFilesAsync(string folderPath = "");
}
