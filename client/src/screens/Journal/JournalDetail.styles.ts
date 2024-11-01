import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 40,
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
  flipButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    color: 'white',
    marginBottom: 10,
  },
  shadow: {
    position: 'absolute',
    top: 103,
    height: 550,
    width: '90%',
    borderRadius: 20,
    elevation: 5,
  },
  outerContainer: {
    height: 550,
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
    height: 50,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    width: '75%',
    height: 48,
    resizeMode: 'contain',
  },
  titleTtubeot: {
    height: 50,
    width: '25%',
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
  },
  pictureContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  picture: {
    width: '42%',
    height: 210,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  journalTitleContainer: {
    borderBottomWidth: 1,
    paddingTop: 50,
    padding: 15,
    borderColor: 'black',
  },
  journalTitle: {
    fontSize: 22,
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
  returnButton: {
    margin: 20,
  },
});

export default styles;