function addToolbox_9028b() {
    return `<xml style="display: none">
    <category name="循环" colour="#5CACEE">
      <block type="delay"></block>
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <field name="VAR">i</field>
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
        <value name="BY">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <sep></sep>
    <category name="逻辑" colour="#7CCD7C">
    <block type="controls_if"></block>
    <block type="controls_if">
      <mutation else="1"></mutation>
    </block>
    <block type="controls_if">
      <mutation elseif="1" else="1"></mutation>
    </block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <sep></sep>
    <category name="数据" colour="#9AC0CD">
      <block type="math_number">
        <field name="NUM">123</field>
      </block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_constant"></block>
      <block type="math_number_property"></block>
      <block type="math_round"></block>
      <block type="math_on_list"></block>
      <block type="math_modulo"></block>
      <block type="math_constrain">
        <value name="LOW">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="HIGH">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
      </block>
      <block type="math_random_float"></block>
      <block type="math_atan2"></block>
    </category>
    <sep></sep>
    <category name="列表" colour="#5cb1d6">
    <block type="lists_create_empty"></block>
    <block type="lists_create_with"></block>
    <block type="lists_repeat">
      <value name="NUM">
        <block type="math_number">
          <field name="NUM">5</field>
        </block>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf"></block>
    <block type="lists_getIndex"></block>
    <block type="lists_setIndex"></block>
    </category>
    <sep></sep>
    <category name="变量" custom="VARIABLE" colour="#CD69C9">
    </category>
    <sep></sep>
    <category name="函数" custom="PROCEDURE" colour="#F4A460">
    </category>
    <sep></sep>
    <category name="串口" colour="#9966ff">
    <block type="text">
      <field name="TEXT">Hello KmEducation</field>
    </block>
    </category>
    <sep></sep>
    <category name="电机" colour="#9AC0CD">
  
    </category>
    <sep></sep>
    <category name="LED" colour="#FF4040">
  
    </category>
    <sep></sep>
    <category name="传感器" colour="#90EE90">
  
    </category>
    <sep></sep>
    <category name="音乐" colour="#00CED1">
  
    </category>
    <sep></sep>
    <category name="通信" colour="#66CDAA">
  
    </category>
  </xml>`
}

exports = addToolbox_9028b;