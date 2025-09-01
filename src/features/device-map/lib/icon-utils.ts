import L from 'leaflet'
import { DEVICE_MODEL_COLORS, DEVICE_STATUS_ICONS, type IDevice } from '../../../entities/device'

export const createDeviceIcon = (device: IDevice): L.DivIcon => {
  const color = DEVICE_MODEL_COLORS[device.model] || 'grey'

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold;">${DEVICE_STATUS_ICONS[device.status]}</div>`,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export const createChildIcon = (): L.DivIcon => {
  return L.divIcon({
    html: `<div style="background-color: grey; width: 16px; height: 16px; border-radius: 50%;"></div>`,
    className: 'custom-marker-child',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}
