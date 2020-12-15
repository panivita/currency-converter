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
  Button,
} from "react-bootstrap";

const useBinanceApi = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price"
      );
      const data = await response.json();
      setState(data);
    })();
  }, []);

  return state;
};

const useExchangeRatesapi = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.exchangeratesapi.io/latest?base=USD"
      );
      const data = await response.json();
      const result = [];
      for (const property in data.rates) {
        result.push({ symbol: property, price: data.rates[property] });
      }
      setState(result);
    })();
  }, []);

  return state;
};

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("LTCBTC");
  const [result, setResult] = useState();

  const fromCurrencies = useExchangeRatesapi();
  const toCurrencies = useBinanceApi();

  const listFrom = true ? fromCurrencies : toCurrencies;
  const listTo = true ? toCurrencies : fromCurrencies;

  const convertHandler = () => {
    const from = listFrom.filter(({ symbol }) => symbol === fromCurrency)[0];
    const to = listTo.filter(({ symbol }) => symbol === toCurrency)[0];
    const result = amount * from.price * to.price;
    setResult(result.toFixed(5));
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
                {listFrom.map(({ symbol }) => (
                  <Dropdown.Item key={symbol} eventKey={symbol}>
                    {symbol}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3" size="lg">
              <FormControl type="text" value={result} />
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={toCurrency}
                id="to"
                onSelect={(event) => setToCurrency(event)}
              >
                {listTo.map(({ symbol }) => (
                  <Dropdown.Item key={symbol} eventKey={symbol}>
                    {symbol}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Row>
        <Button onClick={convertHandler}>Convert</Button>
      </Form>
    </Container>
  );
};
export default Converter;
