'use client'

import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import styles from './PlaceholderForm.module.scss'

interface FormData {
  width: number
  height: number
  text: string
}

export default function PlaceholderForm() {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      width: 500,
      height: 200,
      text: 'Hello, World!'
    }
  })
  
  const [previewData, setPreviewData] = useState<{
    width: number
    height: number
    text: string
    calculatedHeight: number
  } | null>(null)
  
  const previewRef = useRef<HTMLDivElement>(null)

  const onSubmit = (data: FormData) => {
    const width = data.width || 500
    const height = data.height || 200
    const text = data.text || 'placeholder image'
    
    // Set preview data first, then calculate height after render
    const tempData = {
      width,
      height,
      text,
      calculatedHeight: 200 // temporary height
    }
    
    setPreviewData(tempData)
    
    // Calculate the display height after the preview is rendered
    setTimeout(() => {
      if (previewRef.current) {
        const fitWidth = previewRef.current.clientWidth
        const calculatedHeight = Math.floor(fitWidth * (height / width))
        
        setPreviewData({
          width,
          height,
          text,
          calculatedHeight
        })
      }
    }, 0)
  }

  const handleDownload = () => {
    if (!previewData) return

    const canvas = document.createElement('canvas')
    canvas.width = previewData.width
    canvas.height = previewData.height
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill background
    ctx.fillStyle = '#e2e2e2'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw text
    ctx.fillStyle = '#555'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Size text
    ctx.font = `${Math.floor(previewData.height * 0.1)}px sans-serif`
    ctx.fillText(
      `${previewData.width} x ${previewData.height}`,
      canvas.width / 2,
      canvas.height / 2 - 10
    )
    
    // Text content
    ctx.font = `${Math.floor(previewData.height * 0.08)}px sans-serif`
    ctx.fillText(
      previewData.text,
      canvas.width / 2,
      canvas.height / 2 + 10
    )
    
    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${previewData.width}x${previewData.height}-${previewData.text}.png`
      link.click()
      URL.revokeObjectURL(link.href)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor="width">width</label>
        <input
          type="number"
          id="width"
          placeholder="500"
          {...register('width', { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="height">height</label>
        <input
          type="number"
          id="height"
          placeholder="200"
          {...register('height', { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="text">text</label>
        <input
          type="text"
          id="text"
          placeholder="Hello, World!"
          {...register('text')}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        generate
      </button>

      {previewData && (
        <div
          ref={previewRef}
          className={styles.placeholderDiv}
          style={{
            height: `${previewData.calculatedHeight}px`,
            backgroundColor: '#e2e2e2',
          }}
          role="img"
          aria-label={`${previewData.width}x${previewData.height} ${previewData.text}`}
        >
          <span className={styles.sizeLabel}>
            {previewData.width} x {previewData.height}
          </span>
          <span className={styles.textLabel}>
            {previewData.text}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleDownload}
        disabled={!previewData}
        className={styles.downloadBtn}
      >
        ダウンロード
      </button>
    </form>
  )
}