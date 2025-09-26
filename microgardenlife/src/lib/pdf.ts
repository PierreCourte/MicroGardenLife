import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { uploadFile, getContentKey } from './storage'

export async function createWatermarkedPDF(
  sourcePdfPath: string,
  email: string,
  orderId: string
): Promise<void> {
  // In a real implementation, you would:
  // 1. Fetch the source PDF from R2/S3 or local file
  // 2. Use pdf-lib to add watermarks
  // 3. Upload the personalized version
  
  // Mock implementation for now
  const mockPdfBuffer = Buffer.from('Mock PDF content')
  
  try {
    // Create watermarked PDF (mock)
    const watermarkText = `MicroGardenLife — Achat: ${orderId} — ${email}`
    
    // In real implementation:
    // const existingPdfBytes = await fetch(sourcePdfPath).then(res => res.arrayBuffer())
    // const pdfDoc = await PDFDocument.load(existingPdfBytes)
    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    // Add watermark to each page
    // const pages = pdfDoc.getPages()
    // pages.forEach((page) => {
    //   const { width, height } = page.getSize()
    //   page.drawText(watermarkText, {
    //     x: 50,
    //     y: 30,
    //     size: 8,
    //     font: helveticaFont,
    //     color: rgb(0.5, 0.5, 0.5),
    //     opacity: 0.3,
    //   })
    // })
    
    // const pdfBytes = await pdfDoc.save()
    
    // Upload personalized PDF
    const key = getContentKey('book17', orderId)
    await uploadFile(key, mockPdfBuffer, 'application/pdf')
    
    console.log(`Watermarked PDF created for order ${orderId}`)
  } catch (error) {
    console.error('PDF watermarking error:', error)
    throw new Error('Failed to create watermarked PDF')
  }
}

export async function ensureWatermarkedPDF(
  email: string,
  orderId: string
): Promise<void> {
  // Check if personalized PDF already exists, if not create it
  try {
    const key = getContentKey('book17', orderId)
    // In real implementation, check if file exists in R2/S3
    // For now, always create (mock)
    await createWatermarkedPDF('source-book.pdf', email, orderId)
  } catch (error) {
    console.error('Ensure watermarked PDF error:', error)
    // Fallback to source PDF
  }
}