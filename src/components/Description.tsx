import descriptionStyle from "../styles/description.module.css"
type PropsType = {}

const Description = (props: PropsType) => {

    return (
        <main className={descriptionStyle.main__description}>

            <h2>Transactions App - React JS + TypeScript</h2>
            <h4>
                This application allows users to see a list of transactions, 
                add, delete and filter them.
            </h4>

            <section>
                <h3>INSTALATION</h3> 
                <p>
                    In the project folder path, write in console yarn install<br/>
                    Then to run the project write: yarn start <br />
                    For running tests write: yarn test<br />
                    A windows view should be displayed<br />
                    Just remember to run the server<br/>
                    Data is being obtained from "http://localhost:3000/transactions" <br/>
                    Fetching url can be changed on .dev folder

                </p>
            </section>

            <section>
                <h3>STRUCTURE</h3> 
                <p>
                    Main.tsx has the structure and there the data provider is being introducing<br/>
                    App.tsx has the Routes and components of the transactions application <br/>
                    In src folder is the main project <br/>
                    Assets folder contains all required media<br/>
                    Componens folder has all app components <br />
                    Context folder has the Api Context <br />
                    Hooks folder has the custom hooks <br />
                    Styles folder has the components styles <br />
                    Tests are in the __test__ folder
                </p>
            </section>

            <section>
                <h3>ACTIONS</h3> 
                <p>
                    User can fill out a form to create a new transaction<br/>
                    User can see a list of transactions <br/>
                    User can see the transactions balance <br/>
                    User can delete a transaction clicking on the delete button<br/>
                    User can filter the transactions by beneficiary <br />
                </p>
            </section>
        </main>
    )
}
export default Description