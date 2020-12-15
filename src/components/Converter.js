import React, { useState } from "react";
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
import { useExchangeRatesapi, useBinanceApi } from "./ExchangeApi";
import { ArrowLeftRight } from "react-bootstrap-icons";

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState("");
  const [isSwitch, setIsSwitch] = useState(false);

  const fromCurrencies = useExchangeRatesapi();
  const toCurrencies = useBinanceApi();

  const listFrom = !isSwitch ? fromCurrencies : toCurrencies;
  const listTo = !isSwitch ? toCurrencies : fromCurrencies;

  const convertHandler = () => {
    const from = listFrom.filter(({ symbol }) => symbol === fromCurrency)[0];
    const to = listTo.filter(({ symbol }) => symbol === toCurrency)[0];
    const result = amount * from.price * to.price;
    return setResult(result.toFixed(5));
  };

  return (
    <Container>
      <Form style={{ padding: "3%" }}>
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
          <Button onClick={() => setIsSwitch(true)} variant="outline-light">
            <ArrowLeftRight />
          </Button>
          <Col>
            <InputGroup className="mb-3" size="lg">
              <FormControl
                type="text"
                value={result}
                onChange={convertHandler}
                readOnly
              />
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
        <div className="text-center">
          <Button onClick={convertHandler} variant="light">
            Convert
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default Converter;
