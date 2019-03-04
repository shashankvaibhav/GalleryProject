/**
 * This is the home page of the screen.
 * It will have textinput, grid, loader and notification
 */

// React imports
import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity, Text } from 'react-native';

//apis
import { getPhotosFromPixabay } from '../apis/public.api'

//Utils
const { width, height } = Dimensions.get('window');

//Others
import { SCENE_BACKGROUND } from '../constants/colors.constant'
import { SEARCH_PLACEHOLDER, NO_IMAGES, API_FAILED, NO_INTERNET } from '../constants/string.constant'
import Grid from "react-native-infinite-scroll-grid";
import FlashMessage, { showMessage } from "react-native-flash-message";

// Router flux for navigation
import {
    Actions
} from 'react-native-router-flux';


export default class HomeScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchText: '',
            page: 1,
            refreshing: false,
            loadingMore: false
        };
    }

    componentDidMount = async () => {
        // Show default photos
        this.refreshPhotos();
    }

    /**
     * This method would make a call to server for fetching apis
     * @param
     * query - String
     * page - Number
     */
    fetchPhotos = async (query, page) => {
        const response = await getPhotosFromPixabay(query, page)

        //Handling for api failed
        if (typeof response === 'string' || response instanceof String) {
            this.showToast(API_FAILED)
        }

        if (response.error_code && response.error_code == -1) {
            this.showToast(NO_INTERNET)
        }

        if (response && response.hits) {

            const { data } = this.state;
            const newData = response.hits

            // If no images found. 
            if (newData.length == 0) {
                return;
            }

            // Merge with last data for pagination effect
            let merged = merged = data.concat(newData);

            this.setState({ data: merged })
        }
    }

    /**
     * Notify user
     */
    showToast = (message) => {
        showMessage({
            message: message,
            type: "info",
        });
    }

    /**
     * This would refresh photos from the first page
     */
    refreshPhotos = () => {
        const { searchText } = this.state;
        // Refresh requires only data from 1st page
        this.fetchPhotos(searchText, 1, true);
    }


    onEndReached = () => {
        this.setState({ page: this.state.page + 1 },
            () => {
                const { searchText, page } = this.state;

                //When page is changed. Do new query
                this.fetchPhotos(searchText, page);
            })
    }

    /**
     * This is the single cell of the grid
     */
    renderItem = (props) => {
        return (
            <TouchableOpacity style={styles.photoWrapperView} onPress={() => Actions.IMAGE_VIEWER({ uri: props.item.largeImageURL })}>
                <Image
                    style={styles.photo}
                    source={{ uri: props.item.previewURL }}
                />
            </TouchableOpacity>
        );
    }

    /** 
     * This is triggered when there is a change in text.
     * @param
     * searchText - String
     */
    changeText = (searchText) => {
        //When changing text page should change to 1 and last data must be cleared
        this.setState({ searchText, page: 1, data: [] },
            () => {
                const { searchText, page } = this.state;

                //When text is changed. Do new query
                this.fetchPhotos(searchText, page);
            })

    }


    render() {
        const { data } = this.state;

        return (
            <View style={styles.container}>

                <View style={styles.textInputWrapperView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.changeText(text)}
                        value={this.state.searchText}
                        placeholder={SEARCH_PLACEHOLDER}
                    />
                </View>

                {data.length == 0 ? (
                    <View style={styles.placeholder}>
                        <Image
                            style={{ height: 60, width: 60 }}
                            source={require('../images/picture.png')}
                        />
                        <Text>{NO_IMAGES}</Text>
                    </View>
                ) : (
                        <Grid
                            style={styles.grid}
                            numColumns={4}
                            data={this.state.data}
                            keyExtractor={item => item.id.toString()}
                            renderItem={info => this.renderItem(info)}
                            onRefresh={() => this.refreshPhotos()}
                            refreshing={this.state.refreshing}
                            onEndReached={() => this.onEndReached()}
                            loadingMore={this.state.loadingMore}
                        />
                    )}

                <FlashMessage position="bottom" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SCENE_BACKGROUND,
    },
    photoWrapperView: {
        height: width / 4,
        width: width / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        height: width / 4 - 10, width: width / 4 - 10, resizeMode: 'cover'
    },
    textInputWrapperView: {
        backgroundColor: 'white', margin: 10, borderColor: '#D3D3D3', borderWidth: 1
    },
    textInput: {
        height: 40
    },
    grid: {
        flex: 1
    },
    placeholder: {
        flex: 1,
        backgroundColor: SCENE_BACKGROUND,
        justifyContent:'center',
        alignItems:'center'
    }

});