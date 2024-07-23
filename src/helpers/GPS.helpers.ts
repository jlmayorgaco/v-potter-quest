export interface IGPS  {
    lat: number,
    lng: number
}

export interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

export function isOS(): boolean {
    const isIOS = !(
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/)
    );
    return isIOS;
}



export function StartOrientationDevice(): Promise<any>{
    return new Promise((resolve, reject) =>  {
        const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;
        if(isOS() && typeof requestPermission === 'function'){
           requestPermission().then((response) => {
                if (response === "granted") {
                    resolve("ios"); 
                } else {
                    reject("has to be allowed!");
                }
            })
            .catch(() => alert("not supported"));
        } else{
            resolve("android");
        }
    })
   
}

export function StartLocationDevice(): Promise<any>{
    return new Promise((resolve, reject) =>  {
        resolve(true)
    })
    
}


export function LocationsAbsDifference(currentPosition: IGPS, referencePosition:IGPS):IGPS {
   const diffLat = Math.abs(currentPosition.lat - referencePosition.lat);
   const diffLng = Math.abs(currentPosition.lng - referencePosition.lng);
   return {
    lat: diffLat,
    lng: diffLng
   }
}


export function LocationsAngleDifference(currentPosition: IGPS, referencePosition:IGPS):number {
  const phiK = (referencePosition.lat * Math.PI) / 180.0;
  const lambdaK = (referencePosition.lng * Math.PI) / 180.0;
  const phi = (currentPosition.lat * Math.PI) / 180.0;
  const lambda = (currentPosition.lng * Math.PI) / 180.0;
  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda)
    );
  return Math.round(psi);
 }