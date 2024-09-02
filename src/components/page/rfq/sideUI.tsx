import { assetsRootPath } from "@/components/utils";
import { Steps, Typography } from "antd";
import React, { createContext, useReducer, Dispatch, Reducer, useContext, ReactNode } from 'react';

export const RFQSideUI = ({ step,updateSteps }: { step: number,updateSteps:(e:number)=>void }) => {
  const o = useContext(ContextRFQ)
    
  return (
    
      
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
                items={o.state}
                />
        </div>
    );
}


interface StepStruct {
    title: string | ReactNode;
    status: 'finish' | 'wait';
    description?: string;
    style?: any;
}

interface ContextType {
  state: StepStruct[];
  dispatch: Dispatch<ContextAction>;
}

interface ContextAction {
  type: 'UPDATE_STEP_STATUS';
  payload: { title: string|ReactNode; status: 'finish' | 'wait', description?:string, style?: any};
}

export const ContextRFQ = createContext<ContextType>({} as ContextType);

export const initialStateRFQ: StepStruct[] = [
    {
        title: <h6 className="text-primary2">Mode of Shipment</h6>,
        description: "Pending",
        status: "wait",
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Trade Type</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5 ,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Incoterm</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Port Pair & Free Time</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Container & Cargo Details</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Add on Services</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Payment Terms</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Remarks</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
    {
        title: <h6 className="text-primary2">Point of contact</h6>,
        description: "Pending",
        status: 'wait',
        style:{
          paddingBottom: 25,
          lineHeight:0.1,
          paddingTop:5,
          color: "#F3F6FF"
        }
    },
];

export const reducerRFQ: Reducer<StepStruct[], ContextAction> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STEP_STATUS':
      return state.map((step) => {
        if (step.title === action.payload.title) {
          return { ...step, status: action.payload.status, description: action.payload.status?"Completed":"Pending" };
        }
        return step;
      });
    default:
      return state;
  }
};

