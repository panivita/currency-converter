import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [result, setResult] = useState();

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then((res) => res.json())
      .then((response) => {
        const currencyAr = ["EUR"];
        for (const key in response.rates) {
          currencyAr.push(key);
        }
        setFiatCurrencies(currencyAr);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price")
      .then((res) => res.json())
      .then((response) => {
        setCryptoCurrencies(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const convertHandler = () => {
    fetch(`https://api.binance.com/api/v3/ticker/price`)
      .then((res) => res.json())
      .then((response) => {
        const responsePrice = response.filter(
          (cur) => cur.symbol === toCurrency
        );
        const result = amount * responsePrice[0].price;
        setResult(result.toFixed(5));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <InputGroup className="mb-3" size="lg">
              <FormControl
                type="number"
                required="required"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={fromCurrency}
                id="from"
                onSelect={(event) => setFromCurrency(event)}
              >
                {" "}
                {fiatCurrencies.map((cur) => (
                  <Dropdown.Item key={cur} eventKey={cur}>
                    {cur}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3" size="lg">
              {result && (
                <FormControl
                  type="text"
                  value={result}
                  onChange={convertHandler}
                />
              )}

              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={toCurrency}
                id="to"
                onSelect={(event) => setToCurrency(event)}
              >
                {cryptoCurrencies.map(({ symbol }) => (
                  <Dropdown.Item key={symbol} eventKey={symbol}>
                    {symbol}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default Converter;
