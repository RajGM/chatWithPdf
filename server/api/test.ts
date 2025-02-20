// ~/server/api/upload.ts

export default defineEventHandler(async (event) => {
    // 1) Parse request body
    const { sessionId, fileId, fileName, mimeType, accessToken } = await readBody<{
      sessionId?: string
      fileId?: string
      fileName?: string
      mimeType?: string
      accessToken?: string
    }>(event)
  
    // Basic validations
    if (!sessionId) {
      throw createError({ statusCode: 400, message: 'Missing sessionId' })
    }
    if (!fileId) {
      throw createError({ statusCode: 400, message: 'Missing fileId' })
    }
    if (!accessToken) {
      throw createError({ statusCode: 400, message: 'Missing accessToken' })
    }
  
    // 2) Build the Drive download URL
    // The "alt=media" parameter means we want the raw file content
    const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`
  
    // 3) Fetch the file from Google Drive (server-to-server)
    let fileBlob: Blob
    try {
      const res = await fetch(driveUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) {
        throw new Error(`Drive fetch failed with status ${res.status}`)
      }
      fileBlob = await res.blob() // or res.arrayBuffer()
    } catch (err) {
      throw createError({
        statusCode: 400,
        message: `Error fetching file from Drive: ${(err as Error).message}`,
      })
    }
  
    // 4) Convert Blob to a File-like object (optional)
    //    If you want to keep a filename & type
    const finalFileName = fileName || 'untitled'
    const finalMimeType = mimeType || fileBlob.type || 'application/octet-stream'
    const file = new File([fileBlob], finalFileName, { type: finalMimeType })
  
    // 5) Now that we have the file, do your usual storage or processing:
    //    - For example: store to S3/R2, parse PDF, etc.
    // e.g.:
    // const fileContent = await file.arrayBuffer()
    // const textContent = extractTextSomehow(fileContent)
    // await someDatabase.saveFile(sessionId, file)
  
    // For demonstration, we'll just return a success message:
    return {
      message: 'File fetched from Drive successfully',
      fileName: finalFileName,
      fileType: finalMimeType,
      size: file.size,
    }
  })
  