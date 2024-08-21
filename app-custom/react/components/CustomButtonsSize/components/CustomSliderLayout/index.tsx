import React, { useEffect, useState } from 'react';
import styles from './styles.css';

import { useListContext } from 'vtex.list-context';
import { useDevice } from 'vtex.device-detector';
import Slider, { ResponsiveObject } from 'react-slick';

type slidesDeviceToShow = 'mobileOnly' | 'desktopOnly' | 'always' | 'never';

interface props {
    showNavigationArrows: slidesDeviceToShow;
    showPaginationDots: slidesDeviceToShow;
    infinite: boolean;
    usePagination: boolean;
    children: any;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    autoplaySpeed: number;
    centerMode: boolean;
    centerPadding: string;
    responsive: ResponsiveObject[];
    nextArrow: string;
    prevArrow: string;
}

export const CustomSlider = ({
    children,
    responsive = [],
    infinite = true,
    showNavigationArrows = 'always',
    showPaginationDots = 'always',
    usePagination = true,
    autoplay = false,
    autoplaySpeed = 3000,
    centerMode = true,
    centerPadding = '',
    nextArrow = '',
    prevArrow = '',
    slidesToScroll = 4,
    slidesToShow = 4,
    speed = 500,
}: props) => {
    const [showArrowsInDevice, setShowArrows] = useState(true);
    const [showDotsInDevice, setShowDots] = useState(true);
    const { list } = useListContext();
    const { isMobile, device } = useDevice();

    useEffect(() => {
        if (isMobile) {
            setShowArrows(
                showNavigationArrows == 'always' ||
                showNavigationArrows == 'mobileOnly',
            );
            setShowDots(
                showPaginationDots == 'always' ||
                showPaginationDots == 'mobileOnly',
            );
        } else {
            setShowArrows(
                showNavigationArrows == 'always' ||
                showNavigationArrows == 'desktopOnly',
            );
            setShowDots(
                showPaginationDots == 'always' ||
                showPaginationDots == 'desktopOnly',
            );
        }
    }, [device]);

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <img
                src={nextArrow}
                className={className}
                style={{ ...style }}
                onClick={onClick}
                alt={'nextArrow'}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <img
                src={prevArrow}
                className={className}
                style={{ ...style }}
                onClick={onClick}
                alt={'prevArrow'}
            />
        );
    }

    const settings = {
        responsive,
        infinite,
        slidesToScroll,
        speed,
        centerMode,
        centerPadding,
        slidesToShow,
        arrows: showArrowsInDevice,
        dots: showDotsInDevice,
        autoplay,
        usePagination,
        autoplaySpeed,
        nextArrow: nextArrow != '' ? <SampleNextArrow /> : undefined,
        prevArrow: prevArrow != '' ? <SamplePrevArrow /> : undefined,
    };

    return (
        <div className={styles['custom-react-slick-slider-container']}>
            <Slider {...settings}>{children.length > 0 ? children : list}</Slider>
        </div>
    );
};

CustomSlider.schema = {
    title: 'Slider Custom',
    type: "object",
    properties: {
        showNavigationArrows: {
            title: "Mostrar setas para navegação",
            type: "string",
            default: "always",
            enum: ["mobileOnly", "desktopOnly", "always", "never"]
        },
        showPaginationDots: {
            title: "Mostrar indicadores de paginação",
            type: "string",
            default: "always",
            enum: ["mobileOnly", "desktopOnly", "always", "never"]
        },
        infinite: {
            title: "Infinito",
            type: "boolean",
            default: true
        },
        usePagination: {
            title: "Usar paginação",
            type: "boolean",
            default: true
        }
    }
};

