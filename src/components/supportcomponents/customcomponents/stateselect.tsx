import React, { useState, useEffect } from 'react';
import { Form, Select, InputNumber, FormInstance } from 'antd';
import useSWR from 'swr';
import { getCity, getCountry, getStates } from '@/network/endpoints';
import { useWatch } from 'antd/es/form/Form';

export const CountrySelect = ({ name, label,onChange, f ,props}:{props?:any,name:any, label:string,onChange:any, f:FormInstance<any>}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR( "/",getCountry,{dedupingInterval:5000*60});

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
    
  }, [data]);

  const handleChange = (value:any) => {    
    f.setFieldValue(name, value)
    onChange(states.filter(state => state.name === value)[0].id)
  };

  return (  
    <Form.Item>
      <Select 
        style={{width: "100%",}}
        showSearch 
        onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
        placeholder="Select country"
      />
    </Form.Item>
  );
};
const StateSelect = ({ name, label, countryId, onChange,f ,props}:{props?:any,name:any, label:string, countryId:string,onChange:any, f:FormInstance<any>}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(countryId?countryId:null, getStates,{dedupingInterval:5000*60});

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    
    f.setFieldValue(name, value)
    onChange(states.filter(state => state.name === value)[0].id)
  };

  return (
    <Form.Item label={label} name={name} {...props}  rules={[{ required: true }]}>
      <Select 
        showSearch 
        onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
        placeholder="Select State"
      />
    </Form.Item>
  );
};
export const StateSelectV2 = ({ name, label, countryId, onChange,f ,props}:{props?:any,name:any, label:string, countryId:string,onChange:any, f:any}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(countryId?countryId:null, getStates,{dedupingInterval:5000*60});

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    f((a:any)=>[...a.map((i:any,Index:number)=>(Index===name?{...i,state:value,stateId:states.filter(state => state.name === value)[0].id}:i))])
  };

  return (
    <Form.Item label={label}  rules={[{ required: true }]}>
      <Select 
        showSearch 
        onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
      />
    </Form.Item>
  );
};

export const StateSelectV3 = ({ name, label, countryId, onChange,f ,props}:{props?:any,name:any, label:string, countryId:string,onChange:any, f:any}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(countryId?countryId:null, getStates,{dedupingInterval:5000*60});

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    f.setFieldValue(name,value)
    onChange(states.filter(state => state.name === value)[0].id)
  };

  return (
    <Form.Item label={label}  rules={[{ required: true }]} style={{width:"100%"}}>
      <Select 
        showSearch 
        onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
        placeholder="Select State"
      />
    </Form.Item>
  );
};

export const CitySelect = ({ name, label, stateId, onChange,f ,...props}:{props?:any,name:any, label:string, stateId:string,onChange:any, f:FormInstance<any>}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(stateId?stateId:null, getCity,{dedupingInterval:5000*60});
  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    f.setFieldValue(name, value)
           
  };

  return (
    <Form.Item label={label} name={name} {...props}  rules={[{ required: true }]}>
      <Select showSearch onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
      />
    </Form.Item>
  );
};
export const CitySelectV2 = ({ name, label, stateId, onChange,f ,props}:{props?:any,name:any, label:string, stateId:string,onChange:any, f:any}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(stateId?stateId:null, getCity,{dedupingInterval:5000*60});
  const city = useWatch(name,f)
  
  useEffect(() => {
      
  }, [city]);

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    f((a:any)=>[...a.map((i:any,Index:number)=>(Index===name?{...i,city:value}:i))])
    onChange(value);
  };

  return (
    <Form.Item label={label}   rules={[{ required: true }]}>

      <Select showSearch onChange={handleChange}
      placeholder="Select City"
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
      />
    </Form.Item>
  );
};
export const CitySelectV3 = ({ name, label, stateId, onChange,f ,props}:{props?:any,name:any, label:string, stateId:string,onChange:any, f:any}) => {
  const [states, setStates] = useState<{name:string,id:string}[]>([]);
  const { data, error } = useSWR(stateId?stateId:null, getCity,{dedupingInterval:5000*60});
  const city = useWatch(name,f)
  
  useEffect(() => {
      
  }, [city]);

  useEffect(() => {
    if (data && data.data) {
      setStates(data.data);
    }
  }, [data]);

  const handleChange = (value:any) => {
    f((a:any)=>[...a.map((i:any,Index:number)=>(Index===name?{...i,city:value}:i))])
  };

  return (
    <Form.Item label={label}   rules={[{ required: true }]}>

      <Select showSearch onChange={handleChange}
        options={states.map(state => ({label:state.name, value:state.name,key:state.id}))}
      />
    </Form.Item>
  );
};


export default StateSelect;
