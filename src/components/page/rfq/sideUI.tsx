import { assetsRootPath } from "@/components/utils";
import { Steps, Typography } from "antd";
import React, { createContext, useReducer, Dispatch, Reducer } from 'react';

export const RFQSideUI = ({ step,updateSteps }: { step: number,updateSteps:(e:number)=>void }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
  return (
    <ContextRFQ.Provider value={{ state, dispatch }}>
      
        <div className='p-1 p-md-3'>
            <div className="d-none d-md-block freightant-logo d-flex justify-content-center my-2 mb-5">
                <img src={assetsRootPath + "image/logos/vector.png"} alt="Freightant Logo" height={"35"} />
            </div>
            <Typography.Title level={3} className="text-center text-primary2">Post RFQ</Typography.Title>
            <Steps
                className='py-2'
                style={{ minHeight: "50vh",maxHeight: "100vh" }}
                direction="vertical"
                current={step}
                onChange={updateSteps}
                items={state}
                />
        </div>
    </ContextRFQ.Provider>
    );
}


interface StepStruct {
    title: string;
    status: 'finish' | 'wait';
    description?: string; // Optional description
}

interface ContextType {
  state: StepStruct[];
  dispatch: Dispatch<ContextAction>;
}

interface ContextAction {
  type: 'UPDATE_STEP_STATUS';
  payload: { title: string; status: 'finish' | 'wait', description?:string};
}

export const ContextRFQ = createContext<ContextType>({} as ContextType);

const initialState: StepStruct[] = [
    {
        title: 'Mode of Shipment',
        description: "Pending",
        status: "finish",
    },
    {
        title: 'Trade Type',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Incoterm',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Port Pair & Free Time', 
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Container & Cargo Details',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Add on Services (POL)',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Payment Terms',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Remarks',
        description: "Pending",
        status: 'wait'
    },
    {
        title: 'Point of contact',
        description: "Pending",
        status: 'wait'
    },
];

const reducer: Reducer<StepStruct[], ContextAction> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STEP_STATUS':
      return state.map((step) => {
        if (step.title === action.payload.title) {
          return { ...step, status: action.payload.status };
        }
        return step;
      });
    default:
      return state;
  }
};

