import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 0,
  },
  backgroundCircle: {
    position: 'absolute',
    top: 0,
    left: -200,
    height: 500,
    width: 800,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    backgroundColor: '#3E4A3D',
  },
  flipContainer: {
    width: 30,
    height: 30,
    padding: 20,
    marginBottom: 20,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
  shadow: {
    position: 'absolute',
    top: 103,
    height: 500,
    width: '92%',
    borderRadius: 20,
    elevation: 5,
  },
  outerContainer: {
    position: 'absolute',
    top: 100,
    height: 500,
    width: '90%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  frontView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: '10%',
    paddingHorizontal: 12,
    marginTop: '1%',
    marginBottom: '4%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    width: '75%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleTtubeot: {
    height: '100%',
    width: '25%',
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
  },
  pictureContainer: {
    width: '100%',
    height: '84%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  picture: {
    width: '42%',
    height: '50%',
    resizeMode: 'contain',
  },
  journalTitleContainer: {
    borderBottomWidth: 1,
    width: '100%',
    height: '15%',
    paddingHorizontal: 10,
    borderColor: 'black',
  },
  journalTitle: {
    fontSize: 20,
  },
  journalContentContainer: {
    padding: 10,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '85%',
    flexWrap: 'wrap',
  },
  journalDetailSection: {
    margin: 10,
    width: '40%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  journalDetail: {
    marginTop: 10,
  },
  journalDetailMap: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footPrintIcon: {
    width: 15,
    height: 22,
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    bottom: 120,
    padding: 10,
  },
});

export default styles;
