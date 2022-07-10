import IDataList from "../model/IDataList";
import { getDataFromServer } from "../Services/Menu";
import { useState, useEffect } from "react";
import Form from "./Form";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sum, setSum] = useState<number | null>()
    const [Susmithaspent, setSusmithaspent] = useState<number>(0)
    const [Chanduspent, setChanduspent] = useState<number>(0)

    let Susmithaspent1 : number = 0;
    let Chanduspent1 : number = 0;

    useEffect(
        () => {
            const getData = async () => {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result,v) =>  result = result + v.price , 0 ));
                Shares(data);

            }
            getData();
        },
        [showForm]
    );

    const Shares = (data :IDataList[]) =>{
    
        data.map(
            sams => (
                sams.payeeName === "Susmitha" ? (
                    Susmithaspent1 = Susmithaspent1 + sams.price
                ):
                (
                    Chanduspent1 = Chanduspent1 + sams.price
                )
            )
        )
        setSusmithaspent(Susmithaspent1)
        setChanduspent(Chanduspent1)
    }

    const success =() => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }


    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <Form onTrue={success} onClose = {cancel}/>
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && (
                    items.map( (user, idx) => {
                        return(
                            <div key={idx}>
                                <div className="use-inline date">{user.setDate}</div>
                                <div className="use-inline">{user.product}</div>
                                <div className="use-inline price">{user.price}</div>
                                <div className="use-inline" style={{width: 112}}>{user.payeeName}</div>
                            </div>
                        )
                    } )
                )
            }
            <hr/>
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Susmitha paid: </div>
            <span className="use-inline total Susmitha">{Susmithaspent}</span> <br />
            <div className="use-inline ">Chandu paid: </div>
            <span className="use-inline total Chandu">{Chanduspent}</span> <br />
            <span className="use-inline payable">{Susmithaspent>Chanduspent? "Pay Susmitha " : "Pay Chandu"}</span>
            <span className="use-inline payable price"> {Math.abs((Susmithaspent-Chanduspent)/2)}</span>
            
        </>
    )

}

export default ShowData;
