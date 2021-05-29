import makeStyles from "@material-ui/core/styles/makeStyles";

export const useCommonStyles = makeStyles(() =>{
    const delta = window.innerWidth / 1280;
    return {
        fs13: { fontSize: Math.round(13 * delta) },
        fs14: { fontSize: Math.round(14 * delta) },
        fs16: { fontSize: Math.round(16 * delta) },
        fs18: { fontSize: Math.round(18 * delta) },
        fs24: { fontSize: Math.round(24 * delta) },
        fs48: { fontSize: Math.round(48 * delta) },
        page: {
            padding: `${34 * delta}px ${39.5 * delta}px`,
            width: '100%',
            boxSizing: 'border-box'
        },
        pageBreadCrumbs: {
            padding: `${22 * delta}px ${29 * delta}px ${12 * delta}px ${29 * delta}px`
        },
        pageContainer: {
            marginTop: 24 * delta
        }
    }
});
