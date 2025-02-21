async function fetchFromGoogleDriveUrl(
    googleDriveUrl,
    token,
    fileName
) {

    console.log("token", token);
    console.log("Download URL:", googleDriveUrl);
    const fileResponse = await fetch(googleDriveUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Log status and headers for debugging
    console.log("Status:", fileResponse.status);
    console.log("Content-Type:", fileResponse.headers.get("content-type"));

    const blob = await fileResponse.blob();
    console.log("Fetched blob for debugging:", blob);

    const finalFile = new File([blob], fileName || "untitled", {
        type: blob.type,
    });
    console.log("FINAL FILE", finalFile);
    return finalFile;
}

fetchFromGoogleDriveUrl('https://www.googleapis.com/drive/v3/files/1TGmghH4_W-OHa21sB4SwsQ0MBNTTdfMkgVCrSH14RME/export?mimeType=application/pdf',
    'ya29.a0AXeO80Q3aTVvR_RFx8Yt5_2bTQ88DjWo0cDZcApu8XGKSJJ0aMeSrz11cZ5MTEk8HpyeLcJeMbHHyPCkNCcnDnbO6Y6djwY4a-MyZ-XwMqGOZp0R4M6SkouvrjvPszjgaQ50YMU7SJZe-NXyiXJzB_78_3qyzDqEGRF0tQBqaCgYKAUYSARASFQHGX2MiTND8v7gG4sjHTIPoIDsidg0175',
'TheBridge - EF - Summer Residency Europe ')