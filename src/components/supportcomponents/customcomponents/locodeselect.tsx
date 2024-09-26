import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash.debounce';
import { locode } from '@/network/endpoints';
import { title } from 'process';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number ,extra:any } = any,
>({ fetchOptions, debounceTimeout = 400, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
        showSearch
      labelInValue
      filterOption={false}
      optionFilterProp={"label"}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<any> {  
  return locode(username)
         .then(r=>{
            return r.data.map((i:any)=>({...i,key:(Math.random()*1000).toFixed(0),value:i.id,label:`${i.emoji} ${i.Country}${i.Location} - ${i.Name},[${i.Subdivision}] ${i.countryname}`,title:i}))
         })
         .catch(r=>{
            
         })   ;
}

const LocodeSelect = ({change,changeLocation,wholeValue,...props}:{wholeValue?:any,props?:any,mode?:any,change:any,changeLocation?:any}) => {
  const [value, setValue] = useState<UserValue[]>([]);
  
  return (
    <DebounceSelect
      value={value}
      {...props}
      placeholder="Select Port"
      suffixIcon={null}
      fetchOptions={fetchUserList}
      onChange={(newValue:any) => {
        if(changeLocation){
          changeLocation(newValue?.title.countryname,newValue?.title.statename);
        }
        if(wholeValue){
          wholeValue(newValue)
        }
        change(newValue?.value);
        setValue(newValue as UserValue[]);
      }}
      style={{ width: '90%' }}
    />
  );
};

export default LocodeSelect;