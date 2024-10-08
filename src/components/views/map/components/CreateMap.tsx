import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { IconCurrentLocation } from "../../../../assets/png";
import { useSwipeHandler } from "../../../../hook/map/useSwipeHandler";
import { MapItemList } from "../../../../types/map/type";
import S from "./CreateMap.module.css";
import { MapCardItem } from "./mapCard/MapCardItem";
import { MapCustomMarker } from "./mapCard/MapCustomMarker";

interface Location {
  lat: number;
  lng: number;
}

interface MapPops {
  currentLocation: Location;
  level?: number;
  mapList: MapItemList;
}
export function CreateMap({ currentLocation, level = 4, mapList }: MapPops) {
  const [center, setCenter] = useState<Location>(currentLocation);
  const [isClick, setIsClick] = useState<number | null>(null);
  const handleSetCenter = (location: Location) => {
    setCenter(location);
  };
  const handlePrevNext = (delta: number) => {
    if (isClick !== null) {
      const newIndex = (isClick + delta + mapList.length) % mapList.length;
      setIsClick(newIndex);
      handleSetCenter({
        lat: parseFloat(mapList[newIndex].lat),
        lng: parseFloat(mapList[newIndex].lng),
      });
    } else if (mapList.length > 0) {
      setIsClick(0);
      handleSetCenter({
        lat: parseFloat(mapList[0].lat),
        lng: parseFloat(mapList[0].lng),
      });
    }
  };
  console.log(parseFloat(mapList[0].lat));
  const {
    handleTouchStart,
    handleTouchMove,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useSwipeHandler(handlePrevNext);

  return (
    <Map
      center={center}
      level={level}
      style={{ width: "100%", height: "100vh" }}
      draggable={true}
      scrollwheel={true}
      isPanto={true}
      maxLevel={1} // 지도 확대 최댓값
      minLevel={7} //지도 축소 최댓값
    >
      {mapList.map((item, idx) => (
        <React.Fragment key={idx}>
          <MapCustomMarker
            title={item.facility}
            center={{
              lng: parseFloat(item.lng),
              lat: parseFloat(item.lat),
            }}
            category={"any"}
            isClick={() => setIsClick(isClick === idx ? null : idx)}
          />
        </React.Fragment>
      ))}
      <MapMarker
        title="현 위치"
        position={currentLocation}
        zIndex={1}
        image={{
          src: IconCurrentLocation,
          size: {
            width: 20,
            height: 20,
          },
        }}
      />
      {mapList.map((item, idx) => (
        <React.Fragment key={idx}>
          {isClick === idx && (
            <div
              className={`${S.createMap__mapCardWrapper} ${
                isClick !== null ? S.slideIn : S.slideOut
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <MapCardItem
                title={item.facility}
                content={item.tel}
                address={item.address}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
}
