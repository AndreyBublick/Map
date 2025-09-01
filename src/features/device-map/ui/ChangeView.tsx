import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

interface ChangeViewProps {
  center: [number, number]
  zoom: number
}

export const ChangeView = ({ center, zoom }: ChangeViewProps) => {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null
}
