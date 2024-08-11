import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import { locode } from '@/network/endpoints';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
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
            return r.data.map((i:any)=>({...i,value:JSON.stringify(i),label:`${i.emoji} ${i.Country}${i.Location} - ${i.Name},[${i.Subdivision}] ${i.countryname}`}))
         })
         .catch(r=>{
            
         })   ;
}

const LocodeSelect = ({change}:{change:any}) => {
  const [value, setValue] = useState<UserValue[]>([]);

  return (
    <DebounceSelect
      value={value}
      placeholder="Select Port"
      suffixIcon={null}
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue as UserValue[]);
      }}
      style={{ width: '90%' }}
    />
  );
};

export default LocodeSelect;