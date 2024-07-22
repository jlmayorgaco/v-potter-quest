<template>
  <div class="about">
    <div id="map"></div>
    <!--
    <GoogleMap ref="mapRef"
      api-key="AIzaSyAaK2KY2pw_NDOARUh-2s9yDNeXz26od5Y"
      style="width: 100%; height: 100vh"
      :center="center"
      :zoom="17"
    >
      <Marker :options="markerOptions" />
    </GoogleMap>
  --></div>
</template>
  
  <script lang="ts">
import { styles } from '../helpers/styles.gmaps'
import { markers } from '../helpers/locations.gmaps'
import { defineComponent } from 'vue'
// import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  components: {},
  setup() {
    let map: any
    const google: any = (window as any).google
    async function initMap() {
      const { Map } = await google.maps.importLibrary('maps')
      const { Marker } = await google.maps.importLibrary('marker')

      map = new Map(document.getElementById('map'), {
        mapId: 'ab33b908a3031b7f',
        center: { lng: -74.11889, lat: 4.724138 },
        zoom: 19
      })
      map.setOptions({ mapTypeControl: false, styles: styles['retro'], zoomControl: false, scrollwheel: true, disableDoubleClickZoom: true })
      map.setTilt(60);
      // The marker, positioned at Uluru
      const gmarkers = Object.values(markers).map(marker => {
       
        return new Marker({
        map: map,
        label: {
            text: `${marker.title}`,
            fontSize: "16px",
            fontWeight: "bold",
            className: "gmarker__top",
        },
        position:marker.position,
        title: marker.title,
        icon: {
          url: marker.icon,
          scaledSize: new google.maps.Size(65, 65)
        }
      })
      })
   

      map.addListener('zoom_changed', () => {
        const zoom = map.getZoom()
        if (zoom <= 15) {
          // Only show each marker above a certain zoom level.
          gmarkers.forEach(marker => marker.setMap(null));
        } else{
          gmarkers.forEach(marker => marker.setMap(map));
        }
      })
    }
    initMap()
    /*
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            //center.value = pos;
          },
          (error) => {
            message.value = JSON.stringify(error);
            console.error(error)
          }
        )
      }
    }
    getLocation();
    */
    return {}
  }
})
</script>
<style lang="scss">
#map {
  width: 100%;
  height: calc(100vh - 5em + 15px);
  padding-bottom: 5em;
}

</style>