import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { createChildIcon, createDeviceIcon } from '../lib'
import { ChangeView } from './ChangeView'
import { MapController } from './MapController'
import type { IDevice } from '../../../entities/device'
import devicesData from '../../../shared/data/devices.json'

export const DeviceMap = () => {
  const devices: IDevice[] = devicesData as IDevice[]
  const mapRef = useRef<L.Map | null>(null)

  // Начальная позиция карты (центр Москвы)
  const center: [number, number] = [55.7558, 37.6173]
  const zoom = 13

  // Обработчик перетаскивания маркера
  const handleDragEnd = (deviceId: string, event: L.DragEndEvent) => {
    const marker = event.target
    const position = marker.getLatLng()
    console.log(`Устройство ${deviceId} перемещено в:`, position)
  }

  // Функция для обработки двойного клика
  const handleDoubleClick = (device: IDevice) => {
    if (mapRef.current) {
      mapRef.current.setView([device.lat, device.lon], 15)
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} id='device-map'>
        <ChangeView center={center} zoom={zoom} />
        <MapController
          onMapReady={map => {
            mapRef.current = map
          }}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {devices.map(device => (
          <div key={device.id}>
            <Marker
              position={[device.lat, device.lon]}
              icon={createDeviceIcon(device)}
              eventHandlers={{
                dblclick: () => handleDoubleClick(device),
                ...(device.id === '1' && {
                  dragend: e => handleDragEnd(device.id, e as L.DragEndEvent),
                }),
              }}
              draggable={device.id === '1'} // Первое устройство перетаскиваемое
            >
              <Popup>
                <div>
                  <h3>{device.name}</h3>
                  <p>Модель: {device.model}</p>
                  <p>Статус: {device.status === 'on' ? 'Включен' : 'Выключен'}</p>
                </div>
              </Popup>
            </Marker>

            {/* Дочерние маркеры, если есть */}
            {device.children &&
              device.children.map((child, index: number) => (
                <Marker
                  key={`${device.id}-child-${index}`}
                  position={[child.lat, child.lon]}
                  icon={createChildIcon()}
                />
              ))}
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
