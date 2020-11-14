import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const SearchComponent = ({panTo}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.727392, lng: () => 127.060996 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox onSelect={async (address) => {
        try {
          // 주소 저장 후 lat,lng로 변환
          const result = await getGeocode({address});
          const {lat,lng} = await getLatLng(result[0]);
          // map re position
          panTo({lat,lng});
          // 검색된 주소 목록 클리어, 검색창은 클릭한 address 입력,
          clearSuggestions();
          // 2번째 변수 shouldfetchdata = false. 이미 클릭한 주소를 우리는 알고 있기 때문
          setValue(address,false);
        }catch(error) {
          console.log("error!");
        }
      }}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
          className="searchInput"
          
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
            </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default SearchComponent;
