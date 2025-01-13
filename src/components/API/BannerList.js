import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { API_BASE_URL } from '@env';
import { getSupplierId } from "../Async/read";
import Pagination from '../home/components/paginator';
import FrameBanner from '../home/components/BannerCont';
import { Skeleton } from 'moti/skeleton';

const Slider = () => {

    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);





    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= banners.length) {
                nextIndex = 0; // Reinicia al primer elemento
            }
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 4000); // Cambia el tiempo en milisegundos según prefieras

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [currentIndex, banners.length]);


    async function fetchData() {
        const supplierId = await getSupplierId();
        try {
            const response = await fetch(`${API_BASE_URL}/bannersBySupplier/${supplierId}`);
            const data = await response.json();
            setBanners(data);
            console.log("fetchpetition", API_BASE_URL, supplierId);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            }
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    return (
        <View style={{ height: 180 }}>
            <View>
                <FlatList

                    ListEmptyComponent={
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 180, width: '100%' }}>
                                        <Text>aun no tines pedidos</Text>
                                    </View>
                                }
                    ref={flatListRef}
                    data={banners}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>

                            {isLoading ? (
                                //<Text>cargando...</Text>
                                <Skeleton width={"80%"} height={125} colorMode='light' />
                            ) : (

                                <FrameBanner item={item} uri={item.uri_1} />


                            )}
                        </View>
                    }
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleOnScroll}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    keyExtractor={(item) => item.banner_id.toString()}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Pagination data={banners} scrollX={scrollX} index={index} />
            </View>
        </View>
    );
};



export default Slider;

const styles = StyleSheet.create({});
