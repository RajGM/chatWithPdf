async function fetchFromGoogleDriveUrl(
    googleDriveUrl,
    fileName,
    callback
){
    // 1) Fetch from Google Drive
    callback?.({ message: "Fetching from Google Drive..." });
    const response = await fetch(googleDriveUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch Google Drive URL: ${response.status}`);
    }

    // 2) Convert to a Blob
    const blob = await response.blob();

    // Optional: Type checks
    // e.g. if you want to confirm the MIME type is PDF or DOCX, etc.
    // For instance:
    // if (!allowedMimeTypes.includes(blob.type)) {
    //   throw new Error(`Unsupported file type: ${blob.type}`)
    // }

    // 3) Create a File if you want a name + type
    const finalFile = new File([blob], fileName || "untitled", {
        type: blob.type,
    });
    console.log("FINAL FILE", finalFile);
    return finalFile;
}

(async () => {
    const file2 = await fetchFromGoogleDriveUrl('https://www.googleapis.com/drive/v3/files/1qHc4IivaZRvuveSN_bD5zjqXkIl2hqiyk8N68AKmwfQ?alt=media&access_token=ya29.a0AXeO80RRLox-6gVgZ_bUfELndbk5m-GDnuqgeUD6W4nSzxy9RiZddrY9tT4yqkDtZ1rjGsY1VXX7ELACbjxpDWPekPppY7v3j2uvsJhfsgToxQy4ItSwkP8MmpEOSB5xNh5ojJ_LhsfJ3fp_vGS5McAPK1BnaR6RDtXu-Db3aCgYKASISARASFQHGX2MiB7JqHMp339oL4Yj1joRvtQ0175');
    console.log("FILE", file2);
    throw createError({ statusCode: 400, message: "No file provided TEST" });
})();

