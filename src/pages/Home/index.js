import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap, MyHeader } from '../../components';
import GetLocation from 'react-native-get-location';
import ProgressCircle from 'react-native-progress-circle'
export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});
  const [loading, setLoading] = useState(true);



  const _getTransaction = async () => {

    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'formulir', {
        fid_user: u.id
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })
    })




  }


  useEffect(() => {




    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const [lokasi, setLokasi] = useState({
    lat: 0,
    long: 0
  })




  return (

    <View style={{
      flex: 1,
      width: "100%",
      height: "100%",



    }}>

      {/* HEADERS */}
      <View style={{
        flexDirection: "row",
        backgroundColor: colors.black,
        padding: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center'


      }}>

        <View>
          <Text style={{
            fontFamily: fonts.primary[600],
            color: colors.white,

          }}>Hi, {user.nama_lengkap}</Text>
          <Text style={{ fontFamily: fonts.primary[800], color: colors.white, fontSize: 20 }}>
            MAJAPAHIT RING
          </Text>
        </View>

        <View>
          <TouchableNativeFeedback >
            <View style={{ flexDirection: "row", padding: 10, borderColor: "#cccccc" }}>
              <Image source={require('../../assets/logo.png')} style={{
                width: 50, height: 50,
              }}
              />
            </View>

          </TouchableNativeFeedback>
        </View>

      </View>

      <View style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
      }}>
        <FlatList data={data} renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ArtikelDetail', item)}>
              <View style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: colors.white,
                marginVertical: 5,

              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <View style={{
                    flex: 1,
                  }}>
                    <View>
                      <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                      }}>Pemesan</Text>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>{item.pemesan}</Text>
                    </View>
                    <View>
                      <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                      }}>Jumlah</Text>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>{item.jumlah}</Text>
                    </View>


                  </View>
                  <View style={{
                    flex: 1,
                  }}>
                    <View>
                      <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                      }}>Nama</Text>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>{item.nama}</Text>
                    </View>
                    <View>
                      <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                      }}>No. Telepon</Text>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>{item.telepon}</Text>
                    </View>
                    <View>
                      <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 12,
                      }}>Status</Text>
                      <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>{item.status_formulir}</Text>
                    </View>

                  </View>
                </View>

                <View style={{
                  marginTop: 10,
                  borderTopWidth: 1,
                  borderColor: colors.primary,
                  paddingTop: 10,
                  flexDirection: 'row',
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: fonts.secondary[800],
                      fontSize: 12,
                    }}>Ring</Text>
                    <Text style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                    }}>{item.ring}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: fonts.secondary[800],
                      fontSize: 12,
                    }}>Warna</Text>
                    <Text style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                    }}>{item.warna}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontFamily: fonts.secondary[800],
                      fontSize: 12,
                    }}>Model</Text>
                    <Text style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 12,
                    }}>{item.model}</Text>
                  </View>
                </View>
              </View>


            </TouchableWithoutFeedback>
          )
        }} />
      </View>


      <TouchableWithoutFeedback onPress={() => navigation.navigate('Pendaftaran', user)}>
        <View style={{
          position: 'absolute',
          width: 120,
          height: 50,
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: colors.primary,
          bottom: 10,
          right: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon type='ionicon' name='add-circle-outline' color={colors.white} />
          <Text style={{
            left: 2,
            fontFamily: fonts.secondary[600],
            color: colors.white,
          }}>Tambah</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})