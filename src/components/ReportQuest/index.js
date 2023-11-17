import { AlertDialog, Button, Text, TextArea, Select } from "native-base";

export default function ReportQuest({reportQuestion, setReportQuestion, handleReportQuestion}){
    const reasons = ['Ameaças', 'Xingamentos', 'Bullying', 'Mensagem imprópria']

    return(
        <AlertDialog isOpen={reportQuestion.open} onClose={()=>setReportQuestion({...reportQuestion, open: false})}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Denunciar pergunta</AlertDialog.Header>
                <AlertDialog.Body>
                    <Text>
                        Motivo
                    </Text>
                    <Select 
                        placeholder='Selecione o motivo' 
                        width='100%'
                        borderRadius={10} 
                        onValueChange={itemValue => setReportQuestion({...reportQuestion, reason: itemValue})} 
                    >
                        {reasons.map((item, index)=>{
                            return <Select.Item key={index} label={`${item}`} value={`${item}`}/>
                        })}
                    </Select>
                    <Text marginTop={4}>
                        Descrição
                    </Text>
                    <TextArea
                        borderRadius={10} 
                        maxLength={96}
                        width='100%' 
                        placeholderTextColor='grey' 
                        placeholder='Digite a descrição'
                        onChangeText={text => {setReportQuestion({...reportQuestion, description: text})}}
                    />
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant='unstyled' colorScheme='coolGray' onPress={()=>setReportQuestion({...reportQuestion, open: false})}>
                            Cancelar
                        </Button>
                        <Button colorScheme='danger' onPress={() => handleReportQuestion()}>
                            Denunciar
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}