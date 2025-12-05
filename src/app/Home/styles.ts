
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E6EC',
    alignItems: 'center',
    paddingTop: 64
  },

  logo: {
    height: 34,
    width: 134,
    
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 42,
    gap: 7,
  },

  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row', 
    width: '100%',
    gap:12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EC',
    paddingBottom: 12,
    marginBottom: 18
  },
  clearButton: {
    marginLeft: 'auto', 
  }, 
  clearText: {
    fontSize: 12, 
    color: '#828282', 
    fontWeight: '600'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEF0F5',
    marginVertical: 16
  },
  listContent: {
    paddingTop: 24, 
    paddingBottom: 62
  },
  emptyText: {
    color: '#808080',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  }
});
