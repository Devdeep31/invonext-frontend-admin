import Charts from "../charts/Charts";
import Invoiceprogress from "../charts/InvoiceProgress";
import Weeksales from "../charts/WeekSales";

const Dashboard = () => {
    return (
        <>
            <div className="flex justify-around">
                <Charts />
                <Weeksales />
                <Invoiceprogress/>
            </div>

        </>
    );
}
export default Dashboard;