import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import type { Map } from 'leaflet'

interface MapControllerProps {
  onMapReady: (map: Map) => void
}

export const MapController = ({ onMapReady }: MapControllerProps) => {
  const map = useMap()

  useEffect(() => {
    onMapReady(map)
  }, [map, onMapReady])

  return null
}
