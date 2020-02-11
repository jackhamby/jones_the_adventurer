export const getCanvasDimensions = () => {
    const element = document.getElementById('canvas-container')
    const width = element ? element.clientWidth : 500;
    const height = element ? element.clientHeight : 500;
    return {
        width,
        height
    }
}