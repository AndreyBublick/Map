import L from 'leaflet'

// Фикс для иконок по умолчанию в Leaflet
const applyLeafletIconFix = () => {
  const DefaultIcon = L.Icon.Default.extend({
    _getIconUrl: function (name: string) {
      if (name === 'icon') {
        return 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'
      }
      if (name === 'iconRetina') {
        return 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png'
      }
      if (name === 'shadow') {
        return 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
      }
      return ''
    },
  })

  // Устанавливаем новую иконку по умолчанию
  L.Marker.prototype.options.icon = new DefaultIcon()
}

// Применяем фикс при загрузке модуля
applyLeafletIconFix()
