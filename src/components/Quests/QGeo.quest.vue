<template>
    <div class="quest quest--card quest__geo">
        <quest-card-template :title="quest.title" :enabled="isValidOk" :error="quest.error" :info="quest.info"
            :actions="quest.actions" @onNext="doHandleNext()" @onBack="doHandleBack()">
            <template #container>
                <div class="q_geo__container">

                    <div class="container__back">
                        <div id="map"></div>
                    </div>

                    <div class="container__front">
                        <div class="compass" @click="doCheck()">
                            <div class="compass-circle"></div>
                            <div class="my-point"></div>
                        </div>
                    </div>


                    <div class="container__front">
                        <div class="compass" @click="doCheck()" :style="styleArrowCircle">
                            <div class="arrow"></div>
                        </div>
                    </div>



                </div>
            </template>
        </quest-card-template>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { ref, computed, reactive, onMounted, toRaw } from 'vue'

import QuestCardTemplate from './_quest.card.vue';
import { LocationsAbsDifference, LocationsAngleDifference, StartLocationDevice, StartOrientationDevice } from '../../helpers/GPS.helpers';
import { styles } from '../../helpers/styles.gmaps'
import { markers } from '../../helpers/locations.gmaps'
export default defineComponent({
    components: {
        QuestCardTemplate
    },
    props: {
        quest: {
            tolerance: { lat: Number, lng: Number },
            position: { lat: Number, lng: Number },
        }
    },
    setup(props) {

        let map;
        const google = (window).google;

        async function initMap() {
            const { Map } = await google.maps.importLibrary('maps')
            const { Marker } = await google.maps.importLibrary('marker')

            map = new Map(document.getElementById('map'), {
                mapId: 'ab33b908a3031b7f',
                center: { lng: -74.12199, lat: 4.724138 },
                zoom: 12

            })
            map.setOptions({ mapTypeControl: false, styles: styles['retro'], zoomControl: true, scrollwheel: true, disableDoubleClickZoom: true })
            map.setTilt(0);

            const _markers = {
                DEVICE: {
                    title: 'Device',
                    position: {
                        lng: -74.11889, lat: 4.724138
                    },
                    tolerance: 10,
                    visible: true,
                },
                TARGET: {
                    title: 'Target',
                    icon: '/img/markers/concentric-color-icon.png',
                    position: {
                        lng: -74.033357, lat: 4.693918
                    },
                    tolerance: 10,
                    visible: true,
                },
            }

            const gmarkers = Object.values(_markers).map(marker => {
                return new Marker({
                    map: map,
                    label: {
                        text: `${marker.title}`,
                        fontSize: "16px",
                        fontWeight: "bold",
                        className: "gmarker__top",
                    },
                    position: marker.position,
                    title: marker.title,
                    icon: {
                        url: marker.icon,
                        scaledSize: new google.maps.Size(65, 65)
                    }
                })
            })

            currentMarkers.value = gmarkers;


        }


        function doHandleNext() {
            this.$emit('onNext')
        }

        function doHandleBack() {
            this.$emit('onBack')
        }

        // Model
        const currentMarkers = ref({});
        const currentAngleDeg = ref(0);
        const currentCompassDeg = ref(0);
        const currentPositionDiff = ref({ lat: 100000, lng: 10000 });
        const currentPositionGPS = ref({ lat: 0, lng: 0 });

        // View Variables
        const styleCompassCircle = ref({});
        const styleArrowCircle = ref({});

        const isValidOk = computed(() => {

            //const diffLat = Math.abs(props.quest.position.lat - currentPositionGPS.value.lat)
            //const diffLng = Math.abs(props.quest.position.lng - currentPositionGPS.value.lng)
            //const errLat = diffLat > props.quest.tolerance.lat;
            //const errLng = diffLng > props.quest.tolerance.lng;
            //return errLat && errLng;
            return false;
        });

        function CompassHeading(alpha, beta, gamma) {

            // Convert degrees to radians
            const alphaRad = 0.00001 + alpha * (Math.PI / 180);
            const betaRad = 0.00001 + beta * (Math.PI / 180);
            const gammaRad = 0.00001 + gamma * (Math.PI / 180);

            // Calculate equation components
            const cA = Math.cos(alphaRad);
            const sA = Math.sin(alphaRad);
            const cB = Math.cos(betaRad);
            const sB = Math.sin(betaRad);
            const cG = Math.cos(gammaRad);
            const sG = Math.sin(gammaRad);

            // Calculate A, B, C rotation components
            const rA = - cA * sG - sA * sB * cG;
            const rB = - sA * sG + cA * sB * cG + 0.00000001;
            const rC = - cB * cG;

            // Calculate compass heading
            let compassHeading = Math.atan(rA / rB);

            // Convert from half unit circle to whole unit circle
            if (rB < 0) {
                compassHeading += Math.PI;
            } else if (rA < 0) {
                compassHeading += 2 * Math.PI;
            }

            // Convert radians to degrees
            compassHeading *= 180 / Math.PI;

            return compassHeading;
        }


        function OrientationDeviceHandler(event) {
            let compass = event.webkitCompassHeading || Math.abs(event.alpha - 360);
            let angle = 16 + 25 + 90 - compass;

            let style = {
                //transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                //transition: "transform 0.05s"
                rotate: `${angle}deg`
            };


            const diffY = currentPositionDiff.value.lat;
            const diffX = currentPositionDiff.value.lng;
            const alpha_kp1 = angle + 90 - Math.atan((diffY) / (diffX + 0.0000001))

            //currentMarkers.value['DEVICE'].setPosition(currentPositionGPS.value);
            //currentMarkers.value['TARGET'].setPosition(currentPositionGPS.value);

            const compassHeading = 0 - CompassHeading(event.alpha, event.beta, event.gamma)
            currentCompassDeg.value = -angle - (360 / (2 * Math.PI)) * Math.atan2(currentPositionDiff.value.lat, 0.00001 + currentPositionDiff.value.lng)
            if (map) map.setHeading(-angle);
            //if(map) map.setCenter(new google.maps.LatLng(currentPositionGPS.value.lat, currentPositionGPS.value.lng ));
            styleCompassCircle.value = {
                //transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                //transition: "transform 0.05s"
                rotate: `${angle}deg`
            };
            styleArrowCircle.value = {
                //transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                //transition: "transform 0.05s"
                rotate: `${currentCompassDeg.value}deg`
            };
        }
        function LocationDeviceHandler(pos) {
            const { latitude, longitude } = pos.coords;
            const currentPosition = { lat: latitude, lng: longitude };
            const referencePosition = props.quest.config.position;
            const diff = LocationsAbsDifference(currentPosition, referencePosition);
            const angle = LocationsAngleDifference(currentPosition, referencePosition);

            currentPositionGPS.value = currentPosition;
            currentPositionDiff.value = diff;
            currentAngleDeg.value = angle < 0 ? (angle + 360) : angle;

            //  ||d|| = 0.0610111661337554 => zoom 12
            //  ||d|| = 0.02496107081036488 => zoom 18

            //map.setCenter(currentPosition.lat, currentPosition.lng, 17)
            if (map) {
                const zoom = -110 * Math.sqrt(diff.lat * diff.lat + diff.lng * diff.lng) + 16;
                const zoom_n = Math.max(11, Math.min(18, zoom))
                console.log({ referencePosition, zoom_n: zoom_n, zoom, diff, diffN: diff.lat + diff.lng })
                map.setZoom(zoom_n);
                map.setCenter(new google.maps.LatLng(currentPosition.lat, currentPosition.lng));
            }
        }


        function doCheck() {

            const diff = currentPositionDiff.value.lat + currentPositionDiff.value.lng;
            const tolerance = props.quest.config.tolerance;
            const isInRange = currentPositionDiff.value.lat < props.quest.config.tolerance.lat && currentPositionDiff.value.lng < props.quest.config.tolerance.lng

            console.log('   ')
            console.log(' doCheck() ==>   ')
            console.log('   ')
            console.log('   ')
            console.log(' is in range diff')
            console.log(isInRange)
            console.log('   ')
            console.log('   ')
            console.log('   ')

            

        }


        // Start Map
        initMap()


        //Start Orientation
        StartOrientationDevice()
            .then((response) => {
                if (response == 'ios') {
                    window.addEventListener("deviceorientation", OrientationDeviceHandler, true);
                } else {
                    window.addEventListener("deviceorientation", OrientationDeviceHandler, true);
                }
            })
            .catch((err) => {
                alert(err);
            })

        // Start Location
        StartLocationDevice().then((response) => {
            //navigator.geolocation.getCurrentPosition(LocationDeviceHandler);
            navigator.geolocation.watchPosition(LocationDeviceHandler);
        })
            .catch((err) => {
                alert(err);
            })


        return { isValidOk, doHandleNext, doHandleBack, styleCompassCircle, styleArrowCircle, currentPositionGPS, currentAngleDeg, currentPositionDiff, doCheck }
    }
})
</script>
<style lang="scss" scoped>
.q_geo__container {
    padding-top: 50px;
    position: relative;
}

.container__front {
    top: 0px;
    left: 0px;
    width: 294px;
    height: 288px;
    overflow: hidden;
    position: absolute;

    display: flex;
    align-content: center;
    justify-items: center;
    align-items: center;
}

.container__back {
    top: 0px;
    left: 0px;
    width: 294px;
    height: 288px;
    overflow: hidden;
    position: absolute;
    filter: blur(0px);
    opacity: 1;

    #map {
        width: 294px;
        height: 288px;
    }
}

.compass {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    margin: auto;
}

.compass>.arrow {
    position: absolute;
    width: 0;
    height: 0;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 30px 20px 0 20px;
    border-color: red transparent transparent transparent;
    z-index: 1;
}

.compass>.compass-circle,
.compass>.my-point {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-out;
    //background: url(https://cdn.onlinewebfonts.com/svg/img_467023.png) center no-repeat;
    background: url('../../assets/compass1.png') center no-repeat;
    background-size: contain;
}

.compass>.my-point {
    opacity: 0;
    width: 20%;
    height: 20%;
    background: rgb(8, 223, 69);
    border-radius: 50%;
    transition: opacity 0.5s ease-out;
}
</style>