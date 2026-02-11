import cloud from '../assets/cloud.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import fog from '../assets/fog.png'
import drizzle from '../assets/drizzling.png'
import thunderstorm from '../assets/thunderstorm.png'
import another from '../assets/another.png'

export const getColorByWeatherId = (weatherId) => {
    if (!weatherId || weatherId === 800) return another

    const group = Math.floor(weatherId / 100)

    switch (group) {
        case 2: // 뇌우
            return thunderstorm
        case 3: // 이슬비
            return drizzle
        case 5: // 비
            return rain
        case 6: // 눈
            return snow
        case 7: // 안개
            return fog
        case 8: // 구름
            return cloud
        default:
            return another
    }
}