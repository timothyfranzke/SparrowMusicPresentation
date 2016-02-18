/**
 * Created by Timothy on 2/13/2016.
 */
sprwApp.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('sparrowPurple', {
        '50': '#20C7D5',
        '100': 'B67F9E',
        '200': 'B67F9E',
        '300': 'B67F9E',
        '400': 'B67F9E',
        '500': '6C3C56',
        '600': '6C3C56',
        '700': '6C3C56',
        '800': '6C3C56',
        '900': '6C3C56',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('sparrowYellow', {
        '50': 'FCB64E',
        '100': 'FCB64E',
        '200': 'FCB64E',
        '300': 'FCB64E',
        '400': 'FCB64E',
        '500': 'FBA72A',
        '600': 'FBA72A',
        '700': 'FBA72A',
        '800': 'FBA72A',
        '900': 'FBA72A',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('sparrowBlue', {
        '50': '20C7D5',
        '100': '20C7D5',
        '200': '20C7D5',
        '300': '20C7D5',
        '400': '20C7D5',
        '500': '20C7D5',
        '600': '20C7D5',
        '700': '20C7D5',
        '800': '20C7D5',
        '900': '20C7D5',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('sparrowPurple')
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('sparrowYellow', {
            'default': '600' // use shade 200 for default, and keep all other shades the same
        });
});
